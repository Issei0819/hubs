var Player_Respawn = document.getElementById("Player-Respawn");
        Player_Respawn.style.display = "none";
        function respawn() {
            Player_Respawn.style.display = "none";
        };
    
        var Player_UI = document.getElementById("Player-UI")
    
        const lifeBar = document.getElementById('life-bar')         // ライフバー
        const lifeMark = document.getElementById('life-mark')       // ライフの光部分
        let life = 100                                              // ライフ初期値
        lifeBar.style.width = "100%"                                // ライフ初期幅
    
        setInterval(() => {
        life = life + 10;
        if ( life > 100 ) {
            life = 100
        }
        lifeBar.style.width = life + "%"
        },1500);
    
        document.addEventListener('keydown', event => {
        if (event.ctrlKey && event.code === 'Slash') {
            life = life - 20;
    
            Player_UI.style.marginTop = "10px";
            Player_UI.style.marginleft = "10px";
            Player_UI.style.margintop = "0px";
            Player_UI.style.marginleft = "0px";
    
            if ( life <= 0 ){
            // 算出の結果 0 以下になった場合
            life = 0
            // 0.3秒後に光部分を非表示にする
            setTimeout(function(){
                lifeMark.style.visibility = 'hidden'
                Player_Respawn.style.display = "block";
                life = 100  
            }, 300)
            } else {
            // 算出の結果 100 を超過した場合
            if ( life > 100 ) {
                life = 100
            }
            // 光部分を表示する
            lifeMark.style.visibility = 'visible'
            }
    
            lifeBar.style.width = life + "%"
        }
        });
    
        //var menu_toggle = document.getElementById("menu")
        //menu_toggle.addEventListener('click', function(){
            //this.classList.toggle('none');
        //});