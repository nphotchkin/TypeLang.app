# TypeLang.app
![image](https://user-images.githubusercontent.com/15834648/177362062-6dfdd17d-677f-4d78-90c3-094740edd91d.png)

<img align="left" alt="TypeScript" width="26px" src="https://iconape.com/wp-content/png_logo_vector/typescript.png" />
<img align="left" alt="Sass" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sass/sass.png" />
<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
<img align="left" alt="Angular" width="26px" src="https://user-images.githubusercontent.com/15834648/177036391-a94a5df2-bae6-4b3a-b769-82e9b6150020.png" />
<img align="left" alt="Firebase" width="26px" src="https://user-images.githubusercontent.com/15834648/177036444-eb21d65c-ceb3-49ce-85c3-41ff9f1df5c2.png" />

<br/>
<br/>

[TypeLang](https://typelang-app.web.app/) is a straight forward language learning app for Typist's - Open Source & Always Free

<img src="https://user-images.githubusercontent.com/15834648/175621591-2b585172-99a2-4c36-9dd6-3eb1cee8e815.png" 
 alt="banner" 
 width="200"/>
 
<br/> 

# Want to Contribute?

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

# Code of Conduct

Before contributing to this repository, please read the [code of conduct](./CODE_OF_CONDUCT.md).

# Support


# Notes

There appears to be two types of learning `games` drilling words is the main aim of this. Then there is scenario based (grammar etc.) this is difficult to generalize as it varies by language. 

Preference is to create games around learning the lexicon, it's down to the Individual to apply that knowledge in context through repeated exposure in the real world. There are a lot of factors involved in determining whether something has been committed to long term memory, the research suggests that this problem is intractable.

Small sets of new words (as many as the number of things they say you can fit in your head)
 - Backed by some research not entirely scientific, though:
   - 10 exposures, you most likely recognize the word.
   - 17 exposures, you most likely have learned the word.
   - Repeated exposure between sessions re-enforces and another `confidence` measure.

Could create an algorithm that assigns you a `Set` per `Duration` which remains static, that set should have some stats captured around
number of exposures and exposures between sessions. 

When some arbitrary number of exposures has been reached & arbitrary number of sessions, assume that word set has been learned.

Even better would be once you have completed a set where you have reached MAGIC NUMBER of sessions & exposures unlock ability
to test your knowledge of the set using (hide and show / given primary language type, the target).
 - To gain more confidence the word has been learned beyond simply exposures, you could capture stats around number of consecutive correct recalls.
 - AFTER number of consecutive recalls has been reached ad this set of words to the users profile as words they have truely learnt.
 
Call these `Sets` Language packs with chest unlocks and confetti, a player can only have X number of active language packs at a time which must be completed before generating new `sets` in order to have completed a language pack you must succesfully recall through either multiple choice or typing the word in the target language from recall when performing the re-call based test you have X number of lifes which are lost for failure to recall. You must recharge your language pack meter in order to try to pass the test again by going back and playing the normal learn by typing mode.
 
It's all a bit wonky, you could capture the number of times someone revises a completed set after you said they must have learnt it for ERR.

Weekly you get assigned previously completed language packs to demonstrate you have learnt, this is a repetition of the recall / multiple choice game against said pack. Failure to complete again has hearts and requires you to recall through multiple choice / typing blind. After completion of this one time event you get a star against that language pack (kind of like an additional rank, at X number of stars that language pack is said to be 100% complete and will not be chosen again at random).
 - This allows the system to include the repeated exposure accross multiple sessions concept.
 
Every player has a rank, ranks are a delinated by an abitrary number of fully ranked language packs (words said to have been learnt through this process). 
 - Determine ranks and names per number of words
 - Add some call of duty like logos for these ranks.

..

# Developers 
[UI Kit Docs](https://demos.creative-tim.com/blk-design-system-angular/#/documentation/grid)

GITHUB = FREE HOSTING:
 - https://medium.com/@svinkle/publish-and-share-your-own-website-for-free-with-github-2eff049a1cb5

# TODO: 
- Check these out:
 - https://www.sitepoint.com/syncing-css-animations-with-html5-audio/
 - https://github.com/chrvadala/music-beat-detector  
 - https://huggingface.co/models?pipeline_tag=text-to-image&sort=downloads (cache results from english lookups)
