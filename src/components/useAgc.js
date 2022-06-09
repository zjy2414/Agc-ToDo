import agconnect from "@agconnect/api";
import "@agconnect/auth";
import "@agconnect/instance";
import { context } from "./config/agc-service";
import {
  AGConnectCloudDB,
  CloudDBZoneQuery,
  CloudDBZoneConfig,
} from "@agconnect/database";
import { TodoItem } from "./model/TodoItem";

let agcCloudDB;
let cloudDBZone;
let uid;

/**
 * 使用AGC
 * @returns {Promise<AGCApi>}
 */
export function useAgc() {
  agconnect.instance().configInstance(context);
  agconnect.auth().setUserInfoPersistence(1);

  const agc = agconnect;

  return {
    agc,
  };
}

/**
 * useAgcDB 使用AgcDB
 */
export async function useAgcDB() {
  //初始化
  AGConnectCloudDB.initialize(context);

  const getUser = await agconnect.auth().getCurrentUser();
  if (getUser) {
    uid = getUser.getUid();
    console.log(getUser.getUid());
  }

  createSchema();
  openDbZone();
}

/**
 * 创建数据库表
 * @returns {Promise<boolean>}
 */
async function createSchema() {
  console.log("start create schema");
  try {
    const schema = require("./config/TodoItem.json");
    agcCloudDB = AGConnectCloudDB.getInstance();
    await agcCloudDB.createObjectType(schema);
    console.log("create success");
    return true;
  } catch (e) {
    console.log("create failed:" + e.message);
    return false;
  }
}

/**
 * 开启数据库存储区
 * @param flag
 * @returns {Promise<boolean>} 
 */
async function openDbZone() {
  openCloudDBZone().then((res) => {
    if (res === true) {
      console.log("open zone success");
      return true;
    } else {
      console.log("open zone failed");
      return false;
    }
  });
}

/**
 * 开启数据库存储区
 * @returns {Promise<boolean>}
 */
async function openCloudDBZone() {
  console.log("try to open zone");
  try {
    const config = new CloudDBZoneConfig("todos");
    cloudDBZone = await agcCloudDB.openCloudDBZone(config);
    console.log("open zone success:");
    console.log(cloudDBZone);
    return true;
  } catch (e) {
    console.log("open zone failed:" + e.message);
    return false;
  }
}

/**
 * 添加一个todo
 *
 * @param todo The object to be inserted
 * @returns {Promise<number>}
 */
async function executeUpsert(todo) {
  try {
    const cloudDBZoneResult = await cloudDBZone.executeUpsert(todo);
    console.log("upsert " + cloudDBZoneResult + " record");
    return cloudDBZoneResult;
  } catch (e) {
    console.log("upsert failed with reason:" + e.message);
    return 0;
  }
}

/**
 * 删除一个todo
 *
 * @param todo The object to be deleted
 * @returns {Promise<number>}
 */
async function executeDelete(todo) {
  try {
    const num = await cloudDBZone.executeDelete(todo);
    return num;
  } catch (e) {
    console.log("delete failed with reason:" + e.message);
    return 0;
  }
}

/**
 * 查询所有todo
 *
 * @returns {Promise<T[]>}
 */
async function executeQueryAllTodos() {
  try {
    return await new Promise((resolve) => {
      const query = CloudDBZoneQuery.where(TodoItem);
      query.orderByDesc("price");
      cloudDBZone.executeQuery(query).then((snapshot) => {
        const resultArray = snapshot.getSnapshotObjects();
        resolve(resultArray);
      });
    });
  } catch (e) {
    console.log("query failed with reason:" + e.message);
    return null;
  }
}

export {
  uid,
  executeUpsert,
  executeDelete,
  executeQueryAllTodos,
  cloudDBZone,
  CloudDBZoneQuery,
};
