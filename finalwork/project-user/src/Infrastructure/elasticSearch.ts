import {injectable} from "inversify";

@injectable()
export class ElasticSearch {
    public elastic: any;
    public elasticClient: any;

    constructor() {
        this.elastic = require('elasticsearch');
        this.elasticClient = this.elastic.Client({ host: 'localhost:9200' });
    }

    public async searchUsers(searchQuery: string) {
        const query = {
            index: 'users',
            body: {
                query: {
                    multi_match: {
                        query: searchQuery,
                        fields: ['name', 'alias', 'id',],
                        fuzziness: 'AUTO',
                        prefix_length: 2
                    }
                },
                size: 20
            }
        };
        const data = await this.elasticClient.search(query);
        return data.hits.hits;
    }
}