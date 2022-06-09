// agconnect 配置

const context = {
    agcgw: {
      backurl: "connect-drcn.hispace.hicloud.com",
      url: "connect-drcn.dbankcloud.cn",
      websocketbackurl: "connect-ws-drcn.hispace.dbankcloud.com",
      websocketurl: "connect-ws-drcn.hispace.dbankcloud.cn",
    },
    agcgw_all: {
      CN: "connect-drcn.dbankcloud.cn",
      CN_back: "connect-drcn.hispace.hicloud.com",
      DE: "connect-dre.dbankcloud.cn",
      DE_back: "connect-dre.hispace.hicloud.com",
      RU: "connect-drru.hispace.dbankcloud.ru",
      RU_back: "connect-drru.hispace.dbankcloud.ru",
      SG: "connect-dra.dbankcloud.cn",
      SG_back: "connect-dra.hispace.hicloud.com",
    },
    client: {
      cp_id: "YOUR_CP_ID",
      product_id: "YOUR_PRODUCT_ID",
      client_id: "YOUR_CLIENT_ID",
      client_secret: "YOUR_CLIENT_SECRET",
      project_id: "YOUR_PROJECT_ID",
      app_id: "YOUR_APP_ID",
      api_key: "YOUR_API_KEY",
    },
    oauth_client: {
      client_id: "YOUR_CLIENT_ID",
      client_type: 7,
    },
    app_info: {
      app_id: "YOUR_APP_ID",
    },
    service: {
      analytics: {
        collector_url:
          "datacollector-drcn.dt.hicloud.com,datacollector-drcn.dt.dbankcloud.cn",
        collector_url_ru:
          "datacollector-drru.dt.dbankcloud.ru,datacollector-drru.dt.hicloud.com",
        collector_url_sg:
          "datacollector-dra.dt.hicloud.com,datacollector-dra.dt.dbankcloud.cn",
        collector_url_de:
          "datacollector-dre.dt.hicloud.com,datacollector-dre.dt.dbankcloud.cn",
        collector_url_cn:
          "datacollector-drcn.dt.hicloud.com,datacollector-drcn.dt.dbankcloud.cn",
        resource_id: "p1",
        channel_id: "",
      },
      search: {
        url: "https://search-drcn.cloud.huawei.com",
      },
      cloudstorage: {
        storage_url: "https://agc-storage-drcn.platform.dbankcloud.cn",
      },
      ml: {
        mlservice_url:
          "ml-api-drcn.ai.dbankcloud.com,ml-api-drcn.ai.dbankcloud.cn",
      },
    },
    region: "CN",
    configuration_version: "3.0",
  };


export {
    context
}
