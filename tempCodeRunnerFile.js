function balanceEnergy(energy) {
  let totalEnergy = 0;

  for (let value of energy) totalEnergy += value;

  let averageEnergy =
    energy.length > 0 ? Math.floor(totalEnergy / energy.length) : 0;

  let leftover = totalEnergy - averageEnergy * energy.length;
  let balanced = [];
  for (let value of energy) balanced.push(averageEnergy);

  return { balanced: balanced, leftover: leftover };
}

console.log(balanceEnergy([1, 2, 3, 5]));