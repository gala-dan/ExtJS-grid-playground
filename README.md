# ExtJS-grid-playground
An extremely rough test bed for me to learn and play around with ExtJS

index.html contains a simple ExtJS grid, which is populated via a store. The store is in turn populated by a call to a restful service, currently served up by a simple node js server (which requires express and websocket, which can be installed via npm). The node server retrieves the data from the users.json file.

The node server also exposes a websocket that the client connects to to simulate updates to the underlying data. Updates are triggered by calling the "addRandomUser" rest endpoint, which will send a message to the client, which will add a new record to the store (obviously in the real world the server would send the new record, but this is very early stages).

Note: I just browse to index.html from the file system. Chrome doesn't like this so I open a new instance with:
    * chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
    
I'd advise against copying the code as it's extremely rough and fragile. Hosting it in github allows me to evolve it without losing a working copy. I'm too cheap to pay for a private repo!
