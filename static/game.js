var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

var cursors;
function preload ()
{
    this.load.image('ship', 'ships/F5S1.png')
    cursors = this.input.keyboard.createCursorKeys();
}

function create ()
{
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var player = this.physics.add.image(137, 183, 'ship');

   // player.setVelocity(100, 200);
    //player.setBounce(1, 1);
    player.setCollideWorldBounds(true);

    emitter.startFollow(player);
}

function update () {
    inputProcessing();
}

function inputProcessing(){
    cursors = this.input.keyboard.createCursorKeys();

    if(cursors.left.isDown){
        console.log('left key pressed');
        player.setVelocityX(-160);
    }
    else{
        player.setVelocityX(0);
    }
}