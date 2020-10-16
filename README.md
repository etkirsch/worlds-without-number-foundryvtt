# Worlds Without Number for Foundry VTT
This is a work in progress implementation of the upcoming [Worlds Without Number system](https://www.kickstarter.com/projects/1637945166/worlds-without-number). I have not requested permission from its author, I am merely setting up the repository such that it can be adapted in the future if he requests it.

## On Jest and ESLint
Though I have seen other systems with eslint enabled, I've noticed that incorporating a testing suite such as Jest is particularly difficult with Foundry System Development. With respect to unit tests, this is primarily an issue due to globally injected classes and variables. Simply creating a `my-class-sheet.test.js` is, frankly, never going to work because it must inherit a global `ActorSheet` or `ItemSheet`. To counter this issue, I have added several classes within the `module/utils/` directory. These classes, each named `Testable___.js`, are the single point of inheritance for their respective types in Worlds Without Number. Each Testable class automatically detects if the environment is a test environment (specifically, checks to see if the respective Sheet or class has been globally injected). If the global class is not present, a Mocked version is returned instead, allowing unit tests to proceed in the absence of Actor, ActorSheet, or ItemSheet.

I recommend other system developers adopt the same approach where possible.

## Notice
I am not affiliated with Sine Nomine Publishing or Mr. Crawford in any way. Further, this project is expressly unaffiliated with my employer and any of their technologies. It is merely a passion project, and I will never attempt to claim compensation for the work on this project.
