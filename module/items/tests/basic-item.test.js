import BasicItem from  '../basic-item.js'
import { itemTemplatePath } from '../../consts.js'

describe('BasicItem', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(BasicItem.defaultOptions.template)
        .toBe(`${itemTemplatePath}/basic-item.html`)
    })
  })
})
