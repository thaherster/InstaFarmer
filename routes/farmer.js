const axios = require('axios');

const express = require('express');
const router = express.Router();
const url_bank = 'https://hooks.zapier.com/hooks/catch/2721226/cy97b4/'
const url_pump = 'https://hooks.zapier.com/hooks/catch/2721226/cyeq3t/'
const url_cusiny = 'https://hooks.zapier.com/hooks/catch/2721226/co74eg/'
const handles_bank = [
    {
        'id': 'uniladadventure'
    }, {
        'id': 'traveltimes.treks'
    }, {
        'id': 'cntraveler'
    }, {
        'id': 'travelchannel'
    }, {
        'id': 'travelnoire'
    }, {
        'id': 'travelmemesofficial'
    }, {
        'id': 'passionpassport'
    }
];

const handles_pump = [
    {
        'id': 'uniladadventure'
    }, {
        'id': 'traveltimes.treks'
    }, {
        'id': 'cntraveler'
    }, {
        'id': 'travelchannel'
    }, {
        'id': 'travelnoire'
    }, {
        'id': 'travelmemesofficial'
    }, {
        'id': 'passionpassport'
    }
];

const handles_cusiny = [
    {
        'id': 'uniladadventure'
    }, {
        'id': 'traveltimes.treks'
    }, {
        'id': 'cntraveler'
    }, {
        'id': 'travelchannel'
    }, {
        'id': 'travelnoire'
    }, {
        'id': 'travelmemesofficial'
    }, {
        'id': 'passionpassport'
    }
];

 instagramPhotos = (handles,hook)=> {
     return new Promise((resolve,reject)=>{

         try {

             const x = Math.floor(Math.random() * handles.length);
             console.log(x);
             const url ='https://www.instagram.com/'+handles[x].id+'/'
             console.log(url)
             axios.get(url).then(userInfoSource=>{

                 // userInfoSource.data contains the HTML from Axios
                 const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)

                 const userInfo = JSON.parse(jsonObject)
                 // Retrieve only the first result

                 const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 1)

                 for (let media of mediaArray) {

                     const node = media.node

                     console.log(node)

                     // Process only if is an image
                     if ((node.__typename && node.__typename === 'GraphImage')) {

                         let res = {
                             url : node.thumbnail_src,
                             caption : node.edge_media_to_caption.edges[0].node.text,
                             handle : handles[x].id
                         };


                         axios.post(hook, {
                             url : node.thumbnail_src,
                             caption : node.edge_media_to_caption.edges[0].node.text,
                             handle : handles[x].id
                         })
                             .then(function (response) {
                                 console.log(response);
                             })
                             .catch(function (error) {
                                 console.log(error);
                             });

                         console.log(res);
                         resolve(true)
                     }
                     else {

                         resolve(false)
                     }
                 }

             }).catch(error=>{

                 console.log(error);
                 resolve(false)
             })


         } catch (e) {

             console.error('Unable to retrieve photos. Reason: ' + e.toString())
             resolve(false)

         }

     });




}

/* Post farm page. */
router.get('/', async function(req, res, next) {
    console.log(req.body); // the posted data

    // instagramPhotos(handles_bank,url_bank).then(status=>{
    //     console.log(status)
    //     if(status)
    //     {
    //         res.end('It worked!');
    //
    //     }
    //     else {
    //         res.end('It did not!');
    //
    //     }
    // }).catch(error=>{
    //     res.end('It did not!');
    //
    // })



    let a = await instagramPhotos(handles_bank,url_bank);
    let b = await instagramPhotos(handles_pump,url_pump);
    let c = await instagramPhotos(handles_cusiny,url_cusiny);

console.log(a,b,c);
res.send('Completed'+a+b+c);

});

module.exports = router;
