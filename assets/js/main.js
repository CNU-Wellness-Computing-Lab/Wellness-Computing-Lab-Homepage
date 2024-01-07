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

    facultyGen();

    $('.selectBox').on('click', function() {
        $('.clicked').attr('class', 'selectBox');
        $(this).attr('class', 'clicked');

        makeClean();
        
        switch($(this).attr('id')) {
            case 'faculty':
                facultyGen();
                break;
            case 'ph.d':
                phdGen();
                break;
            case 'm.s':
                msGen();
                break;
            case 'b.s':
                bsGen();
                break;
            case 'alumni':
                alumniGen();
                break;
            default:
                break;
        }

        
    });

    
});


function makeProfile(imageName, name, researchField, selfIntro) {
   
    const profile = document.createElement('div');
    const peopleInfo = document.createElement('div');
    const peopleImage = document.createElement('img');
    const peopleResearchInfo = document.createElement('div');
    const researcherName = document.createElement('h2');
    const researchFieldDiv = document.createElement('p');
    const selfIntroduction = document.createElement('p');
    
    profile.className = "profile";
    peopleInfo.className = "people-info";

    peopleImage.src = `assets/images/Members/${imageName}.jpg`;
    peopleImage.alt = "Researcher's Photo";
    peopleImage.className = 'people-image col-xs-12 col-sm-12';

    peopleResearchInfo.className = "people-research-info col-md-12";

    researcherName.className = 'researcher-name';
    researcherName.textContent = name;

    researchFieldDiv.className = "profile-text";
    researchFieldDiv.innerHTML = `<strong>Research Field:</strong> ${researchField}`;

    selfIntroduction.id = "self-introduction";
    selfIntroduction.className = "profile-text";
    selfIntroduction.innerHTML = `<strong class='profile-text'>Self-Introduction:</strong><br>${selfIntro}`;

    peopleResearchInfo.appendChild(researcherName);
    peopleResearchInfo.appendChild(researchFieldDiv);
    peopleResearchInfo.appendChild(selfIntroduction);

    peopleInfo.appendChild(peopleImage);
    peopleInfo.appendChild(peopleResearchInfo);
    peopleInfo.appendChild(makeLinked("ff", "ff", "a"));

    profile.appendChild(peopleInfo);
    return profile;
}

function makeLinked(emailAddr, githubAddr, linkedInAddr) {
    const wrapper = document.createElement('div');
    const emailIcon = document.createElement('img');
    const githubIcon = document.createElement('img');
    const linkedInIcon = document.createElement('img');
    const githubA = document.createElement('a');
    const linkedInA = document.createElement('a');

    emailIcon.src = `assets/images/Members/mail.png`;
    emailIcon.alt = "Email";
    emailIcon.className = "linked-image";
    githubIcon.src = `assets/images/Members/github.png`;
    githubIcon.alt = "Github";
    githubIcon.className = "linked-image";
    linkedInIcon.src = `assets/images/Members/linkedIn.png`;
    linkedInIcon.alt = "LinkedIn";
    linkedInIcon.className = "linked-image";

    emailIcon.addEventListener('click', () => {
        navigator.clipboard.writeText(emailAddr)
    .then(() => {alert('이메일이 복사되었습니다: ' + emailAddr);})
    .catch(err => {console.error('복사 실패')});
    });

    githubA.href = githubAddr;
    githubA.target = '_blank';
    linkedInA.href = linkedInAddr;
    linkedInA.target = '_blank';

    githubA.appendChild(githubIcon);
    linkedInA.appendChild(linkedInIcon);

    wrapper.className = "linked-wrapper";
    wrapper.appendChild(emailIcon);
    wrapper.appendChild(githubA);
    wrapper.appendChild(linkedInA);

    return wrapper;
}

function makeClean() {
    $('.profile').remove();
}

function facultyGen() {
    $(".profile-container").append(makeProfile('jaejeongKim', 'Jaejeong Kim', 'digital healthcare, Interactive computing', 'self-introduction'));
}

function phdGen() {

}

function msGen() {
    $(".profile-container").append(makeProfile('yujuKang', 'Yuju Kang', 'researchField', 'self-introduction'));
    $(".profile-container").append(makeProfile('GyeyoungJung', 'Geyeong Jung', 'researchField', 'self-introduction'));
    $(".profile-container").append(makeProfile('JaeyongLee', 'Jaeyong Lee', 'researchField', 'self-introduction'));
}

function bsGen() {
    $(".profile-container").append(makeProfile('seongsooKim', 'Seongsoo Kim', 'researchField', 'self-introduction'));
    $(".profile-container").append(makeProfile('jaejeongKim', 'Yeong Chang', 'researchField', 'self-introduction'));
    $(".profile-container").append(makeProfile('jaejeongKim', 'Jungu Lee', 'researchField', 'self-introduction'));
}

function alumniGen() {
    $(".profile-container").append(makeProfile('sinyoungBok', 'Sinyeong Bok', 'researchField', 'self-introduction'));    
}

