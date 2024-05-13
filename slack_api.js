
async function buildBody(token, url, cookie, preset, endTime){
    const padding = "-----------------------------";
    const paddingHeader = "---------------------------";
	const boundary = "31140284384059021664591199654";
    let outString = "";

    outString+=padding;
    outString+=boundary;
    outString+="\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n";
    outString+=token;
    outString+="\r\n";
    outString+=padding;
    outString+=boundary;
    outString+="\r\nContent-Disposition: form-data; name=\"profile\"\r\n\r\n";

	let jsonBody = preset;

	jsonBody.status_expiration = endTime;

	outString+=JSON.stringify(jsonBody)+'\r\n';
	outString+=padding;
    outString+=boundary;
    outString+="\r\n";

    outString+="Content-Disposition: form-data; name=\"_x_reason\"\r\n\r\nCustomStatusModal:handle_save\r\n";
	outString+=padding;
    outString+=boundary;
    outString+="\r\n";
	
    outString+="Content-Disposition: form-data; name=\"_x_mode\"\r\n\r\nonline\r\n";
	outString+=padding;
    outString+=boundary;
    outString+="\r\n";

    outString+="Content-Disposition: form-data; name=\"_x_sonic\"\r\n\r\ntrue\r\n";
	outString+=padding;
    outString+=boundary;
    outString+="\r\n";
	
    outString+="Content-Disposition: form-data; name=\"_x_app_name\"\r\n\r\nclient\r\n";
	outString+=padding;
    outString+=boundary;
    outString+="--";
    outString+="\r\n";
	
	const contentType = `multipart/form-data; boundary=${paddingHeader}${boundary}`;

	return updateStatusRemote(url, outString, contentType, cookie);
}

async function updateStatusRemote(mainUrl, body, contentType, cookie) {
	const resp = await fetch(mainUrl, {
		"headers": {
			"User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0`,
			"Accept": `*/*`,
			"Accept-Language": `en-GB,en;q=0.5`,
			"Accept-Encoding": `gzip, deflate, br`,
			"Content-Type": contentType,
			"Content-Length": body.length,
			"Origin": `https://app.slack.com`,
			"Connection": `keep-alive`,
			"Cookie": cookie,
			"Sec-Fetch-Dest": `empty`,
			"Sec-Fetch-Mode": `cors`,
			"Sec-Fetch-Site": `same-site`,
			"Pragma": `no-cache`,
			"Cache-Control": `no-cache`,
			"TE": `trailers`
		},
		"body": body,
		"method": "POST",
		"mode": "cors"
	});
	return await resp.json();
}


module.exports = {
	api: buildBody
}