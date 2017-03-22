// Include fs module
var fs = require("fs");

function useStdin() {
	var input = process.stdin.read();

	if (input === null) {
		return;
	}

	// console.log(input.toString());

	// convert to string, trim whitespace, split to array of words
	var inputSplit = input.toString().trim().split(" ");

	if (inputSplit[0] === "cat") {
		 catFile(inputSplit[1]);
	} else if (inputSplit[0] === "touch") {
		touchFile(inputSplit[1]);
	} else if (inputSplit[0] === "rm") {
		rmFile(inputSplit[1]);
	} else if (inputSplit[0] === "replace") {
		replaceFile(inputSplit[1], inputSplit[2], inputSplit[3]);
	} else if (inputSplit[0] === "grep") {
		grepFile(inputSplit[1], inputSplit[2]);
	}

}

process.stdin.on("readable", useStdin);

function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(data.toString());
	});
}

function touchFile(fileName) {
	fs.appendFile(fileName, "", function(err) {
		if (err) {
			console.log(err);
			return;
		}

		console.log("Touched file!");
	});
}


// Your assignment is to implement the following functionality:
// 	* remove a file
// 		"rm" <file name>
// 		> rm hello.txt
// 			entirely delete the file hello.txt

function rmFile(fileName) {
	fs.unlink(fileName, function(err) { 
		if (err) {
			console.log(err);
			return;
		}
		console.log(filename + " deleted successfully");
	});
}

	// * find and replace a word in the file
	// 	"replace" <file to search> <word to replace> <replacement word>
	// 	> replace hello.txt hello goodbye
	// 		replace all instances of hello in hello.txt with goodbye
	// 	> replace what.txt there their
	// 		replace all instances of there in what.txt with their

function replaceFile(fileName, oldWord, newWord) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var s = data.toString();
		var t = s.replace(new RegExp(oldWord,"g"), newWord);
		// console.log(s);
		fs.writeFile(fileName, t, function(err, data) {
			if (err) {
				console.log(err);
				return;
			}
		});
	});
}

	// * find a line in a file
	// 	"grep" <file name> <word to find>
	// 	> grep hello.txt hello
	// 		print out all of the lines in hello.txt that contain "hello"
	// 	> grep what.txt there
	// 		print out all of the lines in what.txt that contain "there"

function grepFile(fileName, word) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var x = data.toString();
		// console.log(x);
		var s = x.split("\n");
		// console.log(s);
		for (var i = 0; i < s.length; i++) {
			if (s[i].search(word) !== -1){
				console.log(s[i]);
			}
		}
	});
}


/*
	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

