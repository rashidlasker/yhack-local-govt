//==========================================================
var modal = document.getElementById('myModal');
var yes = document.getElementById('yesButton');
var no = document.getElementById('noButton');
var btn = document.getElementById('voteBtn');
var span = document.getElementsByClassName("close")[0];
var sw = document.getElementById('switch');
var mc1 = document.getElementById('mc1');
var mc2 = document.getElementById('mc2');
mc2.classList.add("disp-none");
var tog = true;
btn.onclick = function() {
	modal.style.display = 'block';
}
sw.ondblclick = function() {
	if(	$( "#mc2" ).hasClass("disp-none")){
        mc1.classList.add("disp-none");
        mc2.classList.remove("disp-none");
        console.log("lol");
        return;
    } else {
        mc2.classList.add("disp-none");
        mc1.classList.remove("disp-none");
        console.log("lol2");
        return;
    }
}
span.onclick = function() {
	modal.style.display = 'none';
}
window.onclick = function(event) {
	if (event.target == modal || event.target == yes || event.target == no) {
		modal.style.display = 'none';
	}
}