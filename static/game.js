var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        // mode: Phaser.Scale.FIT,
        width: 800,
        height: 600},
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var cursors;

var player;
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

    player = this.physics.add.image(137, 183, 'ship');

   // player.setVelocity(100, 200);
    //player.setBounce(1, 1);
    player.setCollideWorldBounds(true);

    emitter.startFollow(player);
}

function update () {
    inputProcessing();
    }

function inputProcessing(){
    if(cursors.left.isDown){
        console.log('left key')
        player.setVelocityX(-160);
    }
    else if(cursors.right.isDown){
        player.setVelocityX(160);
        console.log('right key');
    }
    else{
        player.setVelocityX(0);
    }
}