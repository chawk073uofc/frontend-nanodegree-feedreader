/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */



/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty URL', function () {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a non-empty name', function () {
            for(let name of allFeeds) {
                expect(name.name).toBeDefined();
                expect(name.name.length).not.toBe(0);
            }
        });
    });


    describe('The Menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            const bodyClass = $('body').attr('class');
            expect(bodyClass).toBe('menu-hidden');
        });

         /* The menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('appears when menu icon clicked and hides when clicked again', function () {
             $('.menu-icon-link').click();
             let bodyClass = $('body').attr('class');
             expect(bodyClass).not.toBe('menu-hidden');

             $('.menu-icon-link').click();
             bodyClass = $('body').attr('class');
             expect(bodyClass).toBe('menu-hidden');
         })
    });

    describe('Initial Entries', function () {
        beforeEach(function(done) {
            loadFeed(0, function () {
                done();
            });
        });
        /* Ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('at least one feed is loaded', function() {
            const feed = $(".feed").get();
            const numEntries = $(".feed").children().length;
            expect(numEntries).not.toBe(0);
        })
    });

    /**
     * When a new feed is loaded by the loadFeed function that the content actually changes
     */
    describe('New Feed Selection', function(){
        let oldFeed;

        // app.js contains an array of RSS feeds. We will load the feed at index 0 and then the feed at index 1 and test the effect of this action on the feed contained in the DOM.
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        /* Test if when a new feed is loaded
         * by the loadFeed function the HTML content actually changes.
         */
        it('has been loaded', function(){
            expect($('.feed').html()).not.toEqual(oldFeed);
        });
    });

}());

/*
 * Pauses execution a given number of milliseconds.
 * Taken from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}