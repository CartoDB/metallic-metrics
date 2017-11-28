import readPkgUp from 'read-pkg-up'

const { pkg } = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
})

export default {
  enabled: true,
  host: 'localhost',
  port: 8125,
  prefix: pkg.name,
  suffix: '',
  globalize: false,
  cacheDns: false,
  mock: process.env.NODE_ENV === 'test',
  globalTags: [],
  interval: 5000
}
