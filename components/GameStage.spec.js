import { GameStage } from './GameStage.js';

describe('GameStage-test', () => {

  it("should mount containing div with .testVerification", function() {
    expect(mount(<GameStage />).find('.testVerification').length).to.equal(1);  });

});
