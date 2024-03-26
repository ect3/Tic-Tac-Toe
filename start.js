const startAudio = new Audio("button.wav");

window.onload = function() {
    document.getElementById("pvp").addEventListener("click", function(){
        
        window.location.href = "pvp.html";
    });

    document.getElementById("hardMode").addEventListener("click", function(){
       
        window.location.href = "pvah.html";
    });

    document.getElementById("pva").addEventListener("click", function(){
        
        window.location.href = "pva.html";
    });
};


// Add event listener to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        // Play the sound
        startAudio.play();
    });
});
 const socialLinks = {
            insta: "https://www.instagram.com/ninz_ect",
            github: "https://github.com/ect3",
            twitter: "https://twitter.com/ninz_ect",
            linkedin: "https://www.linkedin.com/in/santosh-thapa-823026291"
        };
document.getElementById('insta').addEventListener('click', function() {
            window.open(socialLinks.insta, '_blank');
        });

        document.getElementById('github').addEventListener('click', function() {
            window.open(socialLinks.github, '_blank');
        });

        document.getElementById('twitter').addEventListener('click', function() {
            window.open(socialLinks.twitter, '_blank');
        });

        document.getElementById('linkedin').addEventListener('click', function() {
            window.open(socialLinks.linkedin, '_blank');
        });
