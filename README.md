# Genetic_Algorithm_Roulette_js

#### Actual Realese: ####

The project is in your first realease **version 1.0.0** where exists only the Genetic Roulette Algorithm completed.

#### Organization: ####

The project is organizated in the following way:

`CSS` is the browse that contains the style script of the projects. 

`js` is the browse that contains the **Roulette Genetic Algorithm** and has three files in: 

**`generate`**  <[generate.js](https://github.com/Wesleycampagna/Genetic_Algorithm_Roulette_js/blob/master/js/generate.js)> &#8594; script responsible for generate arrays and metrics

**`randomize`** <[randomize.js](https://github.com/Wesleycampagna/Genetic_Algorithm_Roulette_js/blob/master/js/randomize.js)>  &#8594; script resnsible for all randomize functions used for others scripts.

**`ia`** <[ia.js](https://github.com/Wesleycampagna/Genetic_Algorithm_Roulette_js/blob/master/js/ia.js)>&#8594; contains the focus algorithm that project.

#### Execution: ####

- via **node.js** interpreter:

Download the project in a rememberable folder. Open terminal in that folder. Find the path: `Genetic_Algorithm_Roulette_js/js/`. 
Execute the code line:

```Terminal
    node ia.js
```


#### future releases: ####

- GUI for Client-side 

 create a graphic interface using <HTML> and <CSS> - exists in the prototype of that project - where the user will specify by selector (imagined initially like a drag over) the metrics of: `TAX_OF_CROSSOVER`, `TAX_OF_MUTATION`, `NUMBER_OF_INDIVIDUALS`, `FLOOR_CEIL_CP`, `MAX_STACK`. Some of This will contain a checkbox that references a standard value. With that, will be possible determinate from client-side the metrics to which the algorithm will work with. 

 Exists yet a doubt related if javascript's script should be send to client-side when GET method is called or that should be mantain in server-side sending continuously data to other side. 

 Both ways has a trade-off in your proccess. For the one (client-side's script) the process is called continuously on the same machine which allows a simplier implementation mainly on server-side - just send in GET method. For the two (server-side's script) the problem is continuously send the data for client-side and this second receive and change the right tags, but the execution of the programm no need be recursive as the one.

- Adapt to others problems 

 In that release the 8-queens puzzle, bag filling and anothers problems that can be resolved with the genetic algorithm will be added. In html page the users will be able to choose the new problems. 

 ** However, will be needed refactoring in part of code.