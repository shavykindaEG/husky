import fs from 'fs'
import path from 'path'
import tempy from 'tempy'
import getConf from '../getConf'

const testConf = { husky: { foo: 'bar' } }

describe('getConf', (): void => {
  it('should return default conf', (): void => {
    const tempDir = tempy.directory()
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify(testConf)
    )

    expect(getConf(tempDir)).toEqual({
      skipCI: true,
      foo: 'bar',
      overwriteExisting: false
    })
  })

  it('should allow overriding default conf', (): void => {
    const tempDir = tempy.directory()
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify(testConf)
    )

    expect(getConf(tempDir)).toEqual({
      skipCI: true,
      foo: 'bar',
      overwriteExisting: false
    })
  })

  it('should support .huskyrc', (): void => {
    const tempDir = tempy.directory()
    fs.writeFileSync(
      path.join(tempDir, '.huskyrc'),
      JSON.stringify(testConf.husky)
    )

    expect(getConf(tempDir)).toEqual({
      skipCI: true,
      foo: 'bar',
      overwriteExisting: false
    })
  })
})
