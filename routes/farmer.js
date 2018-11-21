const axios = require('axios');

const express = require('express');
const router = express.Router();
const url_bank = 'https://hooks.zapier.com/hooks/catch/2721226/cy97b4/'
const url_pump = 'https://hooks.zapier.com/hooks/catch/2721226/cyeq3t/'
const url_cusiny = 'https://hooks.zapier.com/hooks/catch/2721226/co74eg/'
const handles_bank = [
    {'id': 'life.educated'}, {'id':'attitude_addiction_official'}, {'id':'motivationmafia'},
    {'id': 'd_inspiration_vibes'}, {'id': 'mindset.therapy'}, {'id': 'millionaire_lines'},
    {'id': 'desire2success'}, {'id': 'businessadvicedaily'}, {'id': 'hustle49_51'},
    {'id': 'alpha_leaders'}, {'id': 'm0tivational_quote'}, {'id': 'untappedimprovement'},
    {'id': 'inspirationcartel'}, {'id': 'flying.success'}, {'id': 'successfuldevotion'},
    {'id': 'motivational.joker'}, {'id': 'halftimegods'}, {'id': 'full_dose'},
    {'id': 'why_so_serious_rk'}, {'id': 'straight2wealth'}, {'id': 'moremotivaxion'}, {'id': 'through_motivation'},
    {'id': 'key2power'}, {'id': 'menwithquote'}, {'id': 'mpsuccess'}, {'id': 'millionaires.den'},
    {'id': 'billionairefucks'}, {'id': 'lyfinspiration'}, {'id': 'success.portal'}, {'id': 'millionaire_recreator'},
    {'id': 'malessoul'}, {'id': 'goal.achievers'}, {'id': 'book.of.leaders'}, {'id': 'wedo.quotes'},
    {'id': 'mindofhabit'}, {'id': 'billionaire.words'}, {'id':'millionaire_counsellor'},
    {'id': 'high.performers.quotes'}, {'id': 'dreamsshapers'}, {'id': 'notetoinspire'}, {'id': 'league.of.hustlers'},
    {'id': 'nik_graham'}, {'id': 'help2succeed'}, {'id': 'beastdesire'}, {'id': 'makingcentsoffinance'},
    {'id': 'success.boss'}, {'id':'how2achievesuccess'}, {'id':'key2thegoodlife'}, {'id':'success_gain'},
    {'id': 'kingmotivator'}, {'id': 'activatedmillionaire'}, {'id': 'words4millionaires'}, {'id': 'goalfighters'},
    {'id': 'motivation.ninja'}, {'id': 'earnednotgiven'}, {'id': 'life.changers.quotes'}, {'id': 'millionaireadviser'},
    {'id': 'billionaires_motto'}, {'id': 'trading.priority'}, {'id': 'motivation_admiral'}, {'id': 'success.den'},
    {'id': 'enhanced.motivation'}, {'id': 'classic.success'}, {'id': 'billionaire_thought'}, {'id': 'theclassygentleman'},
    {'id': 'the.future.entrepreneur'}, {'id': 'millionairedivision'}, {'id':'words_worth_billions'},
    {'id': 'internetbusinesslife'}, {'id': 'excellentmotivation'}, {'id': 'richtelligent'}, {'id': 'wordsofsuccess'},
    {'id': 'smartsuccessquotes'}, {'id': 'evolveyourmindset'}, {'id': 'magnificentexcellency'},
    {'id':'success.venue'}, {'id': 'believe2success'}, {'id': 'expandingmindset'}, {'id': 'mineraldeposits'},
    {'id': 'empire_growth'}, {'id': 'fuckmillionsmakebillions'}, {'id': 'billionaire_process'},
    {'id': 'millionaire.dream'}, {'id': 'hustlnhouse'}, {'id': 'achieversmindset.co'}, {'id': 'youcanhavesuccess'},
    {'id': 'success__tips'}, {'id': 'thesuccessfield'}, {'id': 'thehealers001'}, {'id':'successaddictive'},
    {'id': 'millionaire_desires'}, {'id':'billionairesdrive'}, {'id':'smoking.success'}, {'id': 'uniquebymind'},
    {'id': 'motivated_to_succeed'}, {'id': 'sucesswinner'}, {'id': 'moolah.mindset'}, {'id': 'entrepreneur.lifestyle.owner'},
    {'id': 'power.to.succeed'}, {'id': '7figureway'}, {'id': 'millionsempire'}, {'id': 'billion.dollars.motivation'}];
const handles_pump = [
    {'id': 'emrata' }, {'id':'giamacool'}, {'id': 'missamandaparis'}, {'id': 'eriana_blanco'},
    {'id': 'amandaleeback'}, {'id':'eva_andressa'}, {'id': 'jimenasanchezmx'}, {'id': 'nikkidelano'},
    {'id': 'leannabartlett'}, {'id': 'roseysin'}, {'id': 'annanystrom_____'}, {'id': 'iamsarahharris'},
    {'id': 'amandaeliselee'}, {'id': 'saraunderwood'}, {'id': 'yuliett.torres'}, {'id': 'cor_fitnesss'},
    {'id': 'janesfitchicks'}, {'id': 'annanystrom.turkey'}, {'id': 'vvcastrillon'}, {'id': 'anna.nystrrom'},
    {'id': 'allison.parker22'}, {'id': 'issavegas'}, {'id': 'lindseypelas'}, {'id': 'jessicakes33'},
    {'id': 'daniellachavezofficial'}, {'id':'iamyanetgarcia'}, {'id': 'marybaltazarh'}, {'id': 'anastasiya_kvitko'},
    {'id': 'jailyneojeda'}, {'id': 'anacheri'}, {'id': 'ronniecoleman8'}, {'id': 'mrolympia08'},
    {'id': 'roellywinklaar'}, {'id': 'flexatronrhoden'}, {'id': 'bodyworld_fitness'}, {'id': 'martynfordofficial'},
    {'id': 'amandacerny'}, {'id': 'erkojun'}, {'id': 'sharah_ulisses'}, {'id': 'menwithstreetstyle'},
    {'id': 'ryanjterry'}, {'id': 'owen13'}, {'id': 'devinphysique'}, {'id':'dedicatedempire'},
    {'id': 'nohow'}, {'id': 'trainformotivation'}, {'id': 'superglamourous'}, {'id': 'musclemania'},
    {'id': 'simplyshredded'}, {'id': 'rogersnipes'}, {'id': 'mrolympiallc'}, {'id': 'officialslystallone'},
    {'id': 'bodybuildingcom'}, {'id': 'tavicastro'}, {'id': 'annanystrom'}, {'id': 'floydmayweather'},
    {'id': 'philheath'}, {'id': 'brucelee'}, {'id':'jaycutler'}, {'id': 'cristiano'}, {'id':'jacodbruyn'},
    {'id': 'zacaynsley'}, {'id': 'ulisses_world'}, {'id': 'andreideiu_'}, {'id': 'sadikhadzovic'},
    {'id': 'jeremy_buendia'}, {'id': 'chul_soon'}, {'id': 'sergiconstance'}, {'id': 'kaigreene'},
    {'id': 'simeonpanda'}, {'id': 'ulissesworld'}, {'id': 'thakur_anoopsingh'}, {'id': 'sahilkhan'},
    {'id':'just_fitness_health'}, {'id': 'kayla_itsines'}, {'id': 'style'}, {'id': 'fitness_dishes'}, {'id': 'befitbabes'},
    {'id': 'gymaesthetic'}, {'id': 'womensbest.uk'}, {'id': 'girlaesthetics'}, {'id': 'victoriassecret'},
    {'id': 'fitnessgirlsmotivation'}, {'id': 'fit'}, {'id':'fitness_babes_xo'}, {'id': 'soniatlevfitness'},
    {'id': 'sarahstage'}, {'id': 'vqfit'}, {'id': 'thewodlife'}, {'id': 'anniethorisdottir'}, {'id': 'tiaclair1'},
    {'id': 'therock'}, {'id': 'mathewfras'}, {'id':'sarasigmunds'}, {'id': 'fikowski'}, {'id': 'rogueeurope'},
    {'id': 'crossfittraining'}, {'id': 'crossfitgames'}, {'id': 'crossfit'}, {'id': 'roguefitness'}];
const handles_cusiny = [
    {'id':'amazing.cheese'},
    {'id':'devour.friedchicken'},
    {'id': 'amazingseafood'},
    {'id': 'devour.pizza'},
    {'id': 'surfnoturf'},
    {'id': 'hungrycommunities'},
    {'id': 'burgerorder'},
    {'id': 'jimboystacos'},
    {'id': 'burgerlovers101'},
    {'id': 'tastethisnext'},
    {'id': 'amazinfoodie'},
    {'id': 'burgerweekly'},
    {'id': 'foodyfetish'},
    {'id': 'lovebeingfat'},
    {'id': 'devour.burgers'},
    {'id': 'alliegabb'},
    {'id': 'amazintacos'},
    {'id': 'huttoneats'},
    {'id': 'amazingappetites'},
    {'id': 'grubspot'},
    {'id': 'theburgeratti'},
    {'id': '5boroughfoodie'},
    {'id': 'feastonthese'},
    {'id': 'funwithfries'},
    {'id': 'massivecravings'},
    {'id': 'forkmeetsfood'},
    {'id': 'foodatory'},
    {'id': 'bestfood_aroundtheworld'},
    {'id': 'eatphillysbest'},
    {'id': 'tylerflorence'},
    {'id': 'eatingwell'},
    {'id': 'todayfood'},
    {'id': 'allrecipes'},
    {'id': 'sunnyanderson'},
    {'id': 'welldonefood'},
    {'id': 'cookinglight'},
    {'id': 'marthastewart'},
    {'id': 'bonappetitmag'},
    {'id': 'gordongram'},
    {'id': 'delish'},
    {'id': 'wholefoods'},
    {'id': 'creative.recipes'},
    {'id': 'mealpreprecipes'},
    {'id': 'fitwomeneat'},
    {'id': 'purewow'},
    {'id': 'calories.hub'},
    {'id': 'fitness_recipes'},
    {'id': 'healthyfoodvideos'},
    {'id': 'fitness_meals'},
    {'id': 'mealplans'},
    {'id': 'healthyfitnessmeals'},
    {'id': 'healthyminutemeals'},
    {'id': 'goodful'},
    {'id': 'healthyfoodadvice'},
    {'id': 'caloriefixes'},
    {'id': 'deliciousfitnessmeals'},
    {'id': 'healthfood'},
    {'id': 'how2mealprep'},
    {'id': 'howtocountcalories'},
    {'id': 'caloriecomparing'},
    {'id': 'purewowrecipes'},
    {'id': 'whole30recipes'},
    {'id': 'kraftrecipes'},
    {'id': 'skinnytaste'},
    {'id': 'glowrecipe'},
    {'id': 'yum.recipe'},
    {'id': 'cuisineactuelle'},
    {'id': 'beautifulcuisines'},
    {'id': 'lovedrinks'},
    {'id': 'foodlty'},
    {'id': 'foodintheair'},
    {'id': 'foodrepublic'},
    {'id': 'foodstirs'},
    {'id': 'sorrynosalad'},
    {'id': 'foodbible'},
    {'id': 'foodiemobbb'},
    {'id': 'food52'},
    {'id': 'foodandwine'},
    {'id': 'foodbeast'},
    {'id': 'foodys'},
    {'id': 'foodbabyny'},
    {'id': 'foodgod'},
    {'id': 'thehungryfriends'},
    {'id': '15secondmeal.s'},
    {'id': 'thisisinsiderfood'},
    {'id': 'soyummy'},
    {'id': 'tastemadees'},
    {'id': 'tastemadefr'},
    {'id': 'tastemadeuk'},
    {'id': 'tastydemais'},
    {'id': 'tastyjapan'},
    {'id': 'buzzfeedfood'},
    {'id': 'proper_tasty'},
    {'id': 'tastemade'},
    {'id': 'buzzfeedtasty'},
    {'id': 'foodnetwork'},
    {'id': 'bakerbynature'},
    {'id': 'bbqandbottles'},
    {'id': 'cleanfoodcrush'},
    {'id': 'foodagramerz'}];

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

