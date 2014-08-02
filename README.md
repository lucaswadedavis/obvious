#Obvious

is an attempt to make a little tool to visualize arbitrary csv's more easily.

i'm using a style my friends call HTML 0 which breaks a bunch of best practices by using JS to dynamically create the HTML and CSS and inject that into the DOM.

admittedly, this is slower, but I like it because it captures what you want out of a CSS preprocessor without having to deal with a separate technology, and lets me redefine the css on the fly without a bunch of messy jquery.css stuff. (also i like how hipster it is to only have a few script tags in the html document - no link tags (the deviation in style always bothered me) and even the body and head tags are unecessary.) 

in addition to the html 0 heresy, i'm using a heterodox naming convention for my methods: instead of camelcase, words in function names are separated by underscores so I can make functions with side effects ALLCAPS (kind of awkward on my chromebook - with it's lack of a capslock key...).S