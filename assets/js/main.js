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


function makeProfile(imageName, name, engName, researchField, email, selfIntro) {
   
    const profile = document.createElement('div');
    const peopleInfo = document.createElement('div');
    const peopleImage = document.createElement('img');
    const peopleResearchInfo = document.createElement('div');
    const researcherName = document.createElement('h2');
    const englishName = document.createElement('p');
    const researchFieldDiv = document.createElement('p');
    const researcherEmail = document.createElement('p');
    const selfIntroduction = document.createElement('p');
    
    profile.className = "profile";
    peopleInfo.className = "people-info";

    peopleImage.src = `assets/images/${imageName}.jpg`;
    peopleImage.alt = "Researcher's Photo";
    peopleImage.className = 'people-image col-xs-12 col-sm-12';

    peopleResearchInfo.className = "people-research-info col-md-12";

    researcherName.className = 'research-name';
    researcherName.textContent = name;

    englishName.className = "profile-text";
    englishName.innerHTML = `<strong>English Name:</strong> ${engName}`;

    researchFieldDiv.className = "profile-text";
    researchFieldDiv.innerHTML = `<strong>Research Field:</strong> ${researchField}`;

    researcherEmail.className = "profile-text";
    researcherEmail.innerHTML = `<strong>Email:</strong> ${email}`;

    selfIntroduction.id = "self-introduction";
    selfIntroduction.className = "profile-text";
    selfIntroduction.innerHTML = `<strong class='profile-text'>Self-Introduction:</strong><br>${selfIntro}`;

    peopleResearchInfo.appendChild(researcherName);
    peopleResearchInfo.appendChild(englishName);
    peopleResearchInfo.appendChild(researchFieldDiv);
    peopleResearchInfo.appendChild(researcherEmail);
    peopleResearchInfo.appendChild(selfIntroduction);

    peopleInfo.appendChild(peopleImage);
    peopleInfo.appendChild(peopleResearchInfo);

    profile.appendChild(peopleInfo);
    
    return profile;
}

function makeClean() {
    $('.profile').remove();
}

function facultyGen() {
    $(".lab-content").append(makeProfile('jaejeongKim', '김재정', 'Jaejeong Kim', 'researchField', 'email', 'self-introduction'));
}

function phdGen() {

}

function msGen() {
    $(".lab-content").append(makeProfile('jaejeongKim', '강유주', 'Yuju Kang', 'researchField', 'email', 'self-introduction'));
    $(".lab-content").append(makeProfile('jaejeongKim', '정계영', 'Geyeong Jung', 'researchField', 'email', 'self-introduction'));
    $(".lab-content").append(makeProfile('jaejeongKim', '이재용', 'Jaeyong Lee', 'researchField', 'email', 'self-introduction'));
}

function bsGen() {
    $(".lab-content").append(makeProfile('jaejeongKim', '김성수', 'Seongsoo Kim', 'researchField', 'email', 'self-introduction'));
    $(".lab-content").append(makeProfile('jaejeongKim', '장영', 'Yeong Chang', 'researchField', 'email', 'self-introduction'));
    $(".lab-content").append(makeProfile('jaejeongKim', '이준구', 'Jungu Lee', 'researchField', 'email', 'self-introduction'));
    $(".lab-content").append(makeProfile('jaejeongKim', '노채은', 'Chaeun No', 'researchField', 'email', 'self-introduction'));
    $(".lab-content").append(makeProfile('jaejeongKim', '앤서니', 'Anthony', 'researchField', 'email', 'self-introduction'));
}

function alumniGen() {
    $(".lab-content").append(makeProfile('jaejeongKim', '복신영', 'Sinyeong Bok', 'researchField', 'email', 'self-introduction'));    
}