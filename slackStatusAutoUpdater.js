const parse = require('./parse_curl');
const api = require('./slack_api');
const timeTable = require('./timeTable');

const refreshRate = 1 * 60000; // in milliseconds;

let parsed_result = undefined;

async function main(){
	if(parsed_result === undefined){
		parsed_result = await parse.parse();
	}

	const presetToUse = timeTable.getPreset();
	if(presetToUse && presetToUse !== undefined){
		const result = await api.api(parsed_result.token, parsed_result.url, parsed_result.cookie, presetToUse.preset, presetToUse.end);
		
		let nextUpdate = ( (presetToUse.end * 1000) - new Date().getTime()) + 1000; // 1 second padding to so there isn't any sub second weirdness

		if(nextUpdate < 0){
			nextUpdate = refreshRate;
		}
		
		if(!result || !result.ok){
			console.log(new Date().toLocaleString(), "Failed to make the request, try getting a new curl request from the browser");
		}
		console.log("next update at", new Date( new Date().getTime() + nextUpdate).toLocaleString());
		setTimeout(main, nextUpdate);
	}else{
		console.log("next update at", new Date( new Date().getTime() + refreshRate).toLocaleString());
		setTimeout(main, refreshRate);
	}
}
main();

