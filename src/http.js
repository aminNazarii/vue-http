import axios from 'axios';

export default {
    resources: {},
    axios,
    /**
     *
     * @param Vue
     * @param options
     */
    install(Vue, options) {
        this.get = this.axios.get;
        this.delete = this.axios.delete;
        this.head = this.axios.head;
        this.options = this.axios.options;
        this.post = this.axios.post;
        this.put = this.axios.put;
        this.patch = this.axios.patch;
        Vue.prototype.$http = this;
    },
    /**
     *
     * @param resources
     */
    setResources(resources) {
        this.recources = resources;
    },
    /**
     * Get methods and action url by name
     * name: {
     *  uri: '',
     *  method: '' //get, post, put, ...
     * }
     *
     * @param name
     * @param data
     * @param config
     * @returns {*}
     */
    request(name, data, config) {
        let resource = _.get(this.recources, name);

        let uri = resource.uri;

        let queryDataStringObject = {};
        if (uri.indexOf('{') > -1) {
            _.forEach(data, function (value, key) {
                //remove url {params} from data object
                if (uri.indexOf('{' + key + '}') == -1) {
                    queryDataStringObject[key] = value;
                }
                return uri = _.replace(uri, '{'+ key +'}', value);
            });
        }

        if (resource) {
            return this.axios[resource.method](uri, {params: queryDataStringObject}, config);
        }
        return null;
    }
}