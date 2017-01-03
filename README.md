# react-SB
React UI for Genesis-SB theme

A prototype of the code to satisfy requirements of 
[Create single page view for selecting and displaying SB bigrams](https://github.com/bobbingwide/bigram/issues/10)



## To run the server:

cd \apache\htdocs\react-SB
npm start


## To visit the site:

```
http://localhost:8080
```

## To generate the application for inclusion in bigram

```
npm run windows

```

## To run the generated bundle

```
http://qw/react-SB/public
```

## To merge into the genesis-SB theme

Copy `public/bundle.js` to `genesis-SB/js/react-SB.js`




### Other notes


- Depends on WordPress 4.7
- Does not need WP REST API
- Originally developed with WordPress 4.6 and WP REST API
- But no longer supported; not even tested
- The react-SB code now depends on [github bobbingwide bigram] for the bigram custom post type and taxonomies.
- The genesis-SB theme expects the latest version of the React JS code to have been built as above.






