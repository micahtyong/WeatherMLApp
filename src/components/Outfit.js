// ML 
const brain = require("brain.js");
const network = new brain.NeuralNetwork();

// Simple Demo

// 0 (go_eskimo) = temp is cold, it's windy, wear a lot of layers like an Eskimo.
// 1 (go_moderate_eskimo) = temp is moderately cold, it may be a bit windy, wear something that will keep you very warm.
// 2 (go_comfort) = temp is moderate in general. this will be our "midpoint". dress comfortably in pants and maybe a sweater for the morning. 
// 3 (go_moderate_nude) = temp is a bit warmer. maybe some wind, maybe not. a bit humid. i would just stick to a shirt and pants. 
// 4 (go_nude) = super hot, it might be windy, probably really humid. definitely wear as little as possibly without getting thrown in jail for public nudity

// Training with Data

// Some notes

// We need to do feature scaling or mean normalization and a hell of a lot more data. We also should test which features to keep and which to trade or discard. (Range = -1 < x < 1)

// Normalize temperature: mean = 17, range = 30
// Normalize humidity: mean = 65, range = 100
// Normalize wind: mean = 3, range = 10

network.train([
  {input: {temperature: (18.31 - 17) / 30, humidity: (64 - 65) / 100, wind: (3 - 3) / 10}, output: {go_moderate_nude: 1}},
  {input: {temperature: (7 - 17) / 30, humidity: (81 - 65) / 100, wind: (3 - 3) / 10}, output: {go_eskimo: 1}},
  {input: {temperature: (17.2 - 17) / 30, humidity: (48 - 65) / 100, wind: (7.2 - 3) / 10}, output: {go_comfort: 1}},
  {input: {temperature: (26.52 - 17) / 30, humidity: (100 - 65) / 100, wind: (5.7 - 3) / 10}, output: {go_nude: 1}},
  {input: {temperature: (9.64 - 17) / 30, humidity: (58 - 65) / 100, wind: (6.2 - 3) / 10}, output: {go_moderate_eskimo: 1}},
  {input: {temperature: (17.48 - 17) / 30, humidity: (36 - 65) / 100, wind: (2 - 3) / 10}, output: {go_comfort: 1}},
  {input: {temperature: (18.31 - 17) / 30, humidity: (64 - 65) / 100, wind: (4.6 - 3) / 10}, output: {go_comfort: 1}},
  {input: {temperature: (17.61 - 17) / 30, humidity: (77 - 65) / 100, wind: (3.6 - 3) / 10}, output: {go_comfort: 1}},
  {input: {temperature: (21.18 - 17) / 30, humidity: (72 - 65) / 100, wind: (3.1 - 3) / 10}, output: {go_moderate_nude: 1}},
  {input: {temperature: (27.67 - 17) / 30, humidity: (74 - 65) / 100, wind: (2.6 - 3) / 10}, output: {go_nude: 1}},
  {input: {temperature: (9.28 - 17) / 30, humidity: (70 - 65) / 100, wind: (1 - 3) / 10}, output: {go_moderate_eskimo: 1}},
  {input: {temperature: (13.75 - 17) / 30, humidity: (66 - 65) / 100, wind: (4.1 - 3) / 10}, output: {go_moderate_eskimo: 1}},
  {input: {temperature: (6.83 - 17) / 30, humidity: (93 - 65) / 100, wind: (5.7 - 3) / 10}, output: {go_eskimo: 1}}
]);

// Test: if I'm in Miami, Florida right now, what should I wear? 

const result = network.run({temperature: 29.43, humidity: 66, wind: 3.6});

const outfit = Object.keys(result).reduce(function(a, b){ return result[a] > result[b] ? a : b});

console.log(result);
console.log(outfit);