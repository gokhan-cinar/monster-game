var vm1 = new Vue({
    el: '#app',
    data : {
        player_health : 100,
        monster_health : 100,
        game_is_on : false,
        logs : [],
        log_text : {
            attack : 'Player Attack',
            special_attack : 'Special Player Attack',
            heal_up : 'First aid',
            give_up : 'Give up',
            monster_attack : 'Monster Attack'
        }
    },
    methods: {
        start_game : function() {
            this.game_is_on = true; 
        },
        attack : function() {
            var point = Math.ceil(Math.random() * 10);
            this.monster_health -= point;
            this.monster_attack(); 
            this.add_to_log({ turn : "p", text: this.log_text.attack + ' | ' + point});
        },
        special_attack : function() {
            var point = Math.ceil(Math.random() * 25);
            this.monster_health -= point;
            this.monster_attack(); 
            this.add_to_log({ turn : "p", text: this.log_text.special_attack + ' | ' + point });
        },
        heal_up : function() {
            var point = Math.ceil(Math.random() * 20);
            this.player_health += point;
            this.monster_attack();
            this.add_to_log({ turn : "p", text: this.log_text.heal_up + ' | ' + point});
        },
        give_up : function() {
            this.player_health = 0;
            this.add_to_log({ turn : "p", text: this.log_text.give_up });
        },
        monster_attack : function () {
            var point = Math.ceil(Math.random()* 15);
            this.player_health -= point; 
            this.add_to_log({ turn : "m", text: this.log_text.monster_attack + ' | ' + point});
        },
        add_to_log : function (log) {
            this.logs.push(log)
        }
    },
    watch: {
        player_health : function(value) {
            if (value <= 0 ) {
                this.player_health = 0;
                if(confirm('You lose...! Do you want to try again?')) {
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            } else if ( value >= 100) {
                this.player_health = 100
            }
        },
        monster_health : function(value) {
            if (value <= 0 ) {
                this.monster_health = 0;
                if( confirm('Monster lose...!')) {
                    this.player_health =  100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
         player_progress : function() {
                return {
                    width : this.player_health + '%'
                }
         },
         monster_progress : function() {
                return {
                    width : this.monster_health + '%'
                }
        }
    },
})

vm1.newProperty = 'test';
console.log(vm1);
