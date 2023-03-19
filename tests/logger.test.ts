import { MyApp} from "../src/Classes/1-starter";



describe('MyApp', () => {
  it('should call the processMessage method of MessageProcessor', () => {
    // Arrange
    const myApp = new MyApp();
    const spyProcessMessage = jest.spyOn(myApp['messageProcessor'], 'processMessage');

    // Act
    myApp.start();

    // Assert
    expect(spyProcessMessage).toHaveBeenCalled();
  });
});