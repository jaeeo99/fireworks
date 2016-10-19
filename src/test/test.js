/**
 * Created by Jaeeo on 2016. 10. 17..
 */
import chai from 'chai';
var assert = chai.assert
var expect = chai.expect
var should = chai.should()


describe('index', () => {
    context('when not present', function() {
        it.only('값이 없을 때에는 -1 을 리턴함', () => {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, itemList.indexOf(0));
        });
    });
    it('값이 없을 때에는 -1 을 리턴함', () => {
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));
    });
    it('값이 없을 때에는 -1 을 리턴함', () => {
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));
    });
    it('값이 없을 때에는 -1 을 리턴함', () => {
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));
    });
});