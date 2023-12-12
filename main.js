async function get_image(url) {
    return new Promise(function(resolve, reject) {
        const img = $('<img src="' + url + '"/>').css('max-width', '300px');
        img.on('load', () => resolve(img));
        img.on('error', reject);
    });
}

var commands = {
    hello: function(what) {
        this.echo('Hello, ' + what +
                  '. Welcome to this terminal.');
    },
    cat: async function() {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            return get_image(data[0].url);
        } catch (error) {
            this.error('An error occurred: ' + error.message);
        }
    },
    kanna: async function() {
        var text = Array.prototype.slice.call(arguments).join(' ');
        try {
            const response = await fetch(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${encodeURIComponent(text)}`);
            const data = await response.json();
            return get_image(data.message);
        } catch (error) {
            this.error('An error occurred: ' + error.message);
        }
    },
    clean: function() {
        this.clear();
    },
    sudo: function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    },
    '404': function() {
        window.open('https://anilist.co/img/404/404_chan1.jpg', '_blank');
    },
    quit: function() {
        window.close();
    },
    help: function() {
        var commandNames = Object.keys(commands);
        this.echo('Available commands: ' + commandNames.join(', '));
    }
};

var term = $('body').terminal(commands, {
    greetings: "Test Terminal TwT, Switch to desktop mode to make your life easier. Or you don't I fixed it ;)",
    checkArity: false
});
