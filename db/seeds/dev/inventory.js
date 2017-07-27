
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {id: 1, title: 'Bezos', description: 'Something something dark side', picture: 'https://pbs.twimg.com/media/DEtnLBwXoAE_ll3.jpg', price: 100},
        {id: 2, title: 'Star Wars', description: 'Galaxy Far Far Away', picture: 'https://target.scene7.com/is/image/Target/03_StarWars_Categories_StoryBlock_186581-170413_1492117324615?wid=526&qlt=80&fmt=pjpeg', price: 500}
      ]);
    });
};
