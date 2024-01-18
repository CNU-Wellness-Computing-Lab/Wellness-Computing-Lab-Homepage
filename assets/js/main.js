$(document).ready(function() {

    
    /* ======= Fixed header when scrolled ======= */
    
    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 0) {
             $('#header').addClass('header-scrolled');
         }
         else {
             $('#header').removeClass('header-scrolled');
         }
    });
    
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 100});
    
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -50, 'axis':'y'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
		
	});

    $('.email').on('click', function(e) {
        switch(e.target.id) {
            case 'prof':
                copyEmail('jjkim@cnu.ac.kr');
                break;
            case 'yuju':
                copyEmail('yuju@o.cnu.ac.kr');
                break;
            case 'gyeyoung':
                copyEmail('gye0203@o.cnu.ac.kr');
                break;
            case 'jaeyong':
                copyEmail('ljy8972@naver.com');
                break;
            case 'seongsoo':
                copyEmail('kwangkorea@o.cnu.ac.kr');
                break;
            case 'young':
                copyEmail('youngchang1005@gmail.com');
                break;
            case 'jungu':
                copyEmail('wnsrn4970@naver.com');
                break;
            case 'sinyoung':
                copyEmail('sinyoungbok99@gmail.com');
                break;
            default:
                break;
        }
    });

    function copyEmail(address) {
        navigator.clipboard.writeText(address)
        .then(() => {alert('이메일이 복사되었습니다')})
        .catch(err => {console.error('복사 실패')});
    }
});

