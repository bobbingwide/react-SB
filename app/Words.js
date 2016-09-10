/**
 * (C) Copyright Bobbing Wide 2016
 *
 * Hard coded test data that should be replaced by the REST API code 
 * that loads the S-words and B-words from http://bigram.co.uk, locally http://qw/bigram 
 * 
 * We want to access the s-letter category and b-letter category
 * for the selected "letter" ( which may include '-', '?' or  '#' )
 * and display the words we've found from the value for the s-word or b-word
 * depending on the Side - represented here by "first" 
 
 * The questions I ask are... 
 * - do we need to limit ourselves to a particular letter?
 * - when do we refresh the data?
 * - how do we store more than's being displayed
 * - do we implement scrolling similar to that in hookr.io. If so, how?
 * 
 */


let words = [	
		{ id: 1
		, first: 'S'
		, letter: 'A'
		, word: 'Sable'
		}
		,{ id: 2
		, first: 'S'
		, letter: 'A'
		, word: 'Sack'
		}
		,{ id: 3
		, first: 'S'
		, letter: 'A'
		, word: 'Sad'
		}
		,{ id: 4
		, first: 'B'
		, letter: 'A'
		, word: 'Baa'
		}
		,{ id: 5
		, first: 'B'
		, letter: 'A'
		, word: 'Babble'
		}
		,{ id: 6
		, first: 'B'
    , letter: 'A'
		, word: 'Back'
		}
		,{ id: 7
		, first: 'S'
	  , letter: 'B'
		, word: 'Sbad'
		}
		, {id: 8, first: 'S', letter: 'C', word: 'Scot' }
		, {id: 9, first: 'S', letter: 'E', word: 'Sea' }
		, {id: 10, first: 'S', letter: 'H', word: 'Shabby' }
		];

export default words;
