import { Simulation } from './simulation.js';

const sim = new Simulation(10, 10);
sim.randomize();

for (let i = 0; i < 5; i++) {
  sim.step();
  console.log('Tick: ', sim.tick);
}
