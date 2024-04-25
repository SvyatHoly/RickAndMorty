describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should correctly render Ricks`s info', async () => {
    await element(by.id('cellId-1')).tap()
    await expect(element(by.id('name'))).toHaveText('Rick Sanchez')
    await expect(element(by.id('origin'))).toHaveText('Earth (C-137)')
    await expect(element(by.id('gender'))).toHaveText('Male')
    await expect(element(by.id('location'))).toHaveText('Citadel of Ricks')
    await expect(element(by.id('status'))).toHaveText('Alive')
  })
})
