import { helloWorld, add, fetchRandomJoke, fetch5RandomJokes } from '../js/main.js';
// Import the sinon library to allow us to create a spy on the console.log function
import sinon from 'sinon';

QUnit.module('main.js tests', function () {

    QUnit.test('helloWorld should show an alert', function (assert) {
        //Arrange
        const realAlert = global.alert;
        let calledWith = null;
        global.alert = (msg) => { calledWith = msg; };
        //Act
        helloWorld();
        //Assert
        assert.equal(calledWith, "This is an alert!", 'alert should be called with Hello World');
        global.alert = realAlert;
    });

    QUnit.test('add should return the sum of two numbers', function (assert) {
        //Arrange
        const num1 = 2;
        const num2 = 3;
        const expected = 5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, 3) should return 5');
    });

    QUnit.test('add should return the sum of negative numbers', function (assert) {
        //Arrange
        const num1 = -2;
        const num2 = -3;
        const expected = -5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(-2, -3) should return -5');
    });

    QUnit.test('add should return the sum of a positive and a negative number', function (assert) {
        //Arrange
        const num1 = 2;
        const num2 = -3;
        const expected = -1;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, -3) should return -1');
    });

    QUnit.test('add should return the sum of a positive and zero', function (assert) {
        //Arrange
        const num1 = 2;
        const num2 = 0;
        const expected = 2;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, -3) should return -1');
    });

    QUnit.test('fetchRandomJoke should return a joke', function (assert) {
        //Arrange
        let testJoke = "test123";
        //Act
        testJoke = fetchRandomJoke();
        //Assert
        assert.true(testJoke != null, 'fetchRandomJoke should not return null');
        assert.false(testJoke == "test123", 'fetchRandomJoke should reassign the value of testJoke');
    });

    QUnit.test('fetchRandomJoke should return a non-empty string', async function (assert) {
        // Act
        const joke = await fetchRandomJoke();

        // Assert
        assert.equal(typeof joke, 'string', 'fetchRandomJoke should return a string');
        assert.ok(joke.length > 0, 'fetchRandomJoke should not return an empty string');
        assert.ok(joke.includes(' - ') || joke.length > 10, 'fetchRandomJoke should look like a real joke');
    });

    QUnit.test('fetch5RandomJokes should return a multiple jokes', function (assert) {
        //Arrange
        let testJoke = "test123";
        //Act
        testJoke = fetch5RandomJokes();
        //Assert
        assert.true(testJoke != null, 'fetchRandomJoke should not return null');
        assert.false(testJoke == "test123", 'fetchRandomJoke should reassign the value of testJoke');
    });

    QUnit.test('fetch5RandomJokes should return 5 formatted jokes', async function (assert) {
        // Arrange: mock fetch with fake jokes
        const fakeJokes = [
            { setup: 'Setup1', punchline: 'Punchline1' },
            { setup: 'Setup2', punchline: 'Punchline2' },
            { setup: 'Setup3', punchline: 'Punchline3' },
            { setup: 'Setup4', punchline: 'Punchline4' },
            { setup: 'Setup5', punchline: 'Punchline5' },
            { setup: 'Setup6', punchline: 'Punchline6' },
        ];
        const originalFetch = global.fetch;
        global.fetch = async () => ({
            ok: true,
            json: async () => fakeJokes,
        });

        // Act
        const result = await fetch5RandomJokes();

        // Assert
        assert.equal(result.length, 5, 'Should return exactly 5 jokes');
        assert.equal(result[0], 'Setup1 - Punchline1', 'First joke should be formatted correctly');
        result.forEach((joke, i) => {
            assert.equal(typeof joke, 'string', `Joke ${i + 1} should be a string`);
        });

        // Cleanup
        global.fetch = originalFetch;
    });
});