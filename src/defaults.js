export default {
  enabled: true,
  host: 'localhost',
  port: 8125,
  prefix: '',
  suffix: '',
  globalize: false,
  cacheDns: false,
  mock: process.env.NODE_ENV === 'test',
  globalTags: [],
  interval: 5000
}
