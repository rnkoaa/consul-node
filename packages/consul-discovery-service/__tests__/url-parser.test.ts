import {URLParser} from "../src/url-parser";

describe("valid urls can be parsed", () => {
    const urlParser = new URLParser();

    test("a valid url can be passed with http", ()=>{
        const serviceUrl = 'http://banana/hello';
        const serviceRequestObj = urlParser.parse(serviceUrl);
        expect(serviceRequestObj).not.toBeUndefined;
        expect(serviceRequestObj).not.toBeNull;
        expect(serviceRequestObj.path).toEqual('/hello')
        expect(serviceRequestObj.service).toEqual('banana')
        expect(serviceRequestObj.protocol).toEqual('http')
        expect(serviceRequestObj.secure).toEqual(false)
    })
   
    test("a valid url can be passed with https", ()=>{
        const serviceUrl = 'https://banana/hello';
        const serviceRequestObj = urlParser.parse(serviceUrl);
        expect(serviceRequestObj).not.toBeUndefined;
        expect(serviceRequestObj).not.toBeNull;
        expect(serviceRequestObj.path).toEqual('/hello')
        expect(serviceRequestObj.service).toEqual('banana')
        expect(serviceRequestObj.protocol).toEqual('https')
        expect(serviceRequestObj.secure).toEqual(true)
    })
    
    test("a valid url with multiple paths can be passed with https", ()=>{
        const serviceUrl = 'https://banana/hello?key=1234&q=45#hash';
        const serviceRequestObj = urlParser.parse(serviceUrl);
        expect(serviceRequestObj).not.toBeUndefined;
        expect(serviceRequestObj).not.toBeNull;
        expect(serviceRequestObj.path).toEqual('/hello?key=1234&q=45#hash')
        expect(serviceRequestObj.service).toEqual('banana')
        expect(serviceRequestObj.protocol).toEqual('https')
        expect(serviceRequestObj.secure).toEqual(true)
    })
})