import EventBridge, * as $EventBridge from '@alicloud/eventbridge';
import Util from '@alicloud/tea-util';
import Console from '@alicloud/tea-console';
import * as $tea from '@alicloud/tea-typescript';


var fs       = require('fs');

// load EventBridge config
const eb_config = JSON.parse(fs.readFileSync(__dirname + '/ali-config.json','utf8'));

export class Client {

    /**
     * Create client初始化公共请求参数。
     */
    static async createClient(): Promise<EventBridge> {
        let config = new $EventBridge.Config({ });
        // 您的AccessKey ID。
        config.accessKeyId = eb_config.accessKeyId;
        // 您的AccessKey Secret。
        config.accessKeySecret = eb_config.accessKeySecret;
        // 您的接入点。
        config.endpoint = eb_config.ebendpoint;
        return new EventBridge(config);
    }

    /**
     * PutEvents
     */
    static async PutEvents(client: EventBridge): Promise<void> {
        let event = new $EventBridge.CloudEvent({ });
        event.datacontenttype = "application/json";
        event.data = Util.toBytes("test");
        event.id = "a5074581-7e74-4e4c-868f-47e7afdf8445";
        event.source = "acs.oss";
        event.specversion = "1.0";
        event.type = "oss:ObjectCreated:PostObject";
        event.time = "2020-08-24T13:54:05.965Asia/Shanghai";
        event.subject = "1.0";
        event.type = "acs:oss:cn-hangzhou:1234567:xls-papk/game_apk/123.jpg";
        event.extensions = {
            aliyuneventbusname: eb_config.eventbusname,
        };
        try {
            let resp = await client.putEvents([
                event
            ]);
            Console.log("--------------------Publish event to the aliyun EventBus--------------------");
            Console.log(Util.toJSONString($tea.toMap(resp)));
        } catch (error) {
            Console.log(error.message);
        }
    }

    static async main(args: string[]): Promise<void> {
        let client = await Client.createClient();
        await Client.PutEvents(client);
    }

}

Client.main(process.argv.slice(2));