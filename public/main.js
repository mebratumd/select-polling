(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/approval/approval.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/approval/approval.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<div class=\"row justify-content-center\" style=\"margin-top:25px;\">\n  <div class=\"col-lg-6 col-12\">\n    <div *ngIf=\"success\" class=\"alert alert-info\" role=\"alert\">\n      Thanks for placing your vote!\n    </div>\n\n    <div *ngIf=\"errorMsg.length > 0\">\n      <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n        {{ e.msg }}\n      </div>\n    </div>\n\n    <div *ngIf=\"election.type == 'approval' && election.status\">\n      <h3>{{ election.title }}</h3>\n      <span (click)=\"electionTypes()\"><span class=\"material-icons\" style=\"font-size:17px;vertical-align:middle\">help_outline</span> Election type: <b>{{ election.type | uppercase }}</b></span><br>\n      <span>Please select all the candidates that you approve of.</span><br>\n      <span>To be elected: <b>{{ election.vacancies }}</b></span><br>\n      <span style=\"margin-right:5px;\" *ngFor=\"let url of election.links\">\n        <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n        <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n      </span>\n      <p>{{ election.description }}</p>\n      <span>Duration: {{ election.duration }} hour(s)</span><br>\n      <span style=\"color:red;margin-bottom:10px;\">Remaining:\n\n          <b>{{ countdownTime[0].time }}</b>\n\n      </span>\n      <form>\n        <div *ngFor=\"let candidate of election.candidates;index as idx\" style=\"margin-bottom:10px;\" class=\"form-group\">\n          <input *ngIf=\"studentVoterStatus[user.studentnumber] === false\" name=\"candidate._id\" [(ngModel)]=\"approvalOb[candidate._id]\" type=\"checkbox\" value=\"true\" id=\"{{candidate._id}}\" style=\"margin-right:5px;\"><label for=\"{{candidate._id}}\"> {{ candidate.name | titlecase }} <b>[{{ countOb[candidate._id]}}]</b></label>\n          <div class=\"progress\" style=\"margin-top:10px;\">\n            <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\"studentWidths[candidate._id]\">\n            </div>\n          </div>\n        </div>\n      </form>\n      <span *ngIf=\"countdownTime[0].time != 'expired' && studentVoterStatus[user.studentnumber] === false\"\n      class=\"badge badge-pill badge-success voteButton\" (click)=\"myVote(election._id,approvalOb,'approval')\">VOTE</span>\n\n\n    </div>\n\n\n    <div *ngIf=\"election.type == 'approval' && !election.status\">\n      <highcharts-chart\n         [Highcharts] = \"highcharts\"\n         [options] = \"chartInfo_app\"\n         style = \"width: 100%; height: 300px; display: block;\">\n      </highcharts-chart>\n      <highcharts-chart\n         [Highcharts] = \"highcharts\"\n         [options] = \"chartInfo_dis\"\n         style = \"width: 100%; height: 300px; display: block;\">\n      </highcharts-chart>\n      <div style=\"text-align:center\">\n        Created: {{ election.date | date:\"medium\" }}<br>\n        Duration: {{ election.duration }} hours<br>\n        <span *ngIf=\"election.type\">Type of election: <b>{{ election.type | uppercase }}</b></span><br>\n        <span *ngIf=\"election.vacancies\">To be elected: <b>{{ election.vacancies }}</b><br>\n          <span>Total votes: <b>{{ election.total }}</b></span>\n        </span><br>\n        <span><b style=\"color:red;\">Winner(s):</b> <span *ngFor=\"let student of election.winners\"> {{ student.name }} <i class=\"fas fa-check check\"></i></span></span>\n\n        <div>\n          <span *ngFor=\"let url of election.links\">\n            <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n            <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n          </span>\n        </div>\n      </div>\n      <div style=\"text-align:center\">{{ election.description }}</div>\n    </div>\n\n    <div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n      <div class=\"col-12\">\n        <footer style=\"text-align:center;font-size:12px\">\n          2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n          <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n          <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n        </footer>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/classroom/classroom.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/classroom/classroom.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<!-- Button trigger modal -->\n<button #deleteElecModal style=\"display:none;\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">\n</button>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"exampleModalCenter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalCenterTitle\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Are you sure you would like to delete <b>{{ electionToDelete.title }}</b>?</h5>\n        <button #close type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form (ngSubmit)=\"deletePoll()\" #deleteClassroomPoll=\"ngForm\">\n          <div class=\"form-group\">\n            <label for=\"exampleInputPassword1\">Password</label>\n            <input required [(ngModel)]=\"deletePollPassword\" name=\"deletePollPassword\" type=\"password\"\n            minlength=\"6\" maxlength=\"12\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\"><br>\n            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!deleteClassroomPoll.form.valid || isLoadingDelPoll\">\n              <div *ngIf=\"isLoadingDelPoll\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n                <span class=\"sr-only\">Loading...</span>\n              </div>\n              Delete\n            </button>\n          </div>\n        </form>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n<!-- toolbar -->\n<nav aria-label=\"breadcrumb\" class=\"toolbar\">\n  <ol class=\"breadcrumb master\" style=\"margin-bottom:10px;\">\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_master of user.classrooms_master\">\n      <a *ngIf=\"classroom_master.name == classroom.name; else inactiveM\" routerLink=\"/classroom/{{classroom_master.name}}\" style=\"font-weight:bold;\"><i class=\"material-icons\" style=\"font-size:12px;\">vpn_key</i> {{ classroom_master.name }} *</a>\n      <ng-template #inactiveM>\n        <a routerLink=\"/classroom/{{classroom_master.name}}\"><i class=\"material-icons\" style=\"font-size:12px;\">vpn_key</i> {{ classroom_master.name }}</a>\n      </ng-template>\n    </li>\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_student of user.classrooms_student\">\n      <a *ngIf=\"classroom_student.name == classroom.name; else inactiveS\" routerLink=\"/classroom/{{classroom_student.name}}\" style=\"font-weight:bold;\">{{ classroom_student.name }} *</a>\n      <ng-template #inactiveS>\n        <a routerLink=\"/classroom/{{classroom_student.name}}\">{{ classroom_student.name }}</a>\n      </ng-template>\n    </li>\n  </ol>\n</nav>\n\n<div *ngIf=\"waitOnInit\" class=\"row\">\n  <!-- sidebar -->\n  <div class=\"col-lg-3 col-12\" style=\"margin-bottom:25px;\">\n    <div class=\"nav flex-column nav-pills\" id=\"v-pills-tab\" role=\"tablist\" aria-orientation=\"vertical\">\n      <a (click)=\"eraseShared()\" #students class=\"nav-link active\" id=\"v-pills-students-tab\" data-toggle=\"pill\" href=\"#v-pills-students\" role=\"tab\" aria-controls=\"v-pills-students\" aria-selected=\"true\">Students</a>\n      <a (click)=\"eraseShared()\" class=\"nav-link\" id=\"v-pills-history-tab\" data-toggle=\"pill\" href=\"#v-pills-history\" role=\"tab\" aria-controls=\"v-pills-history\" aria-selected=\"false\">Previous Elections</a>\n      <a (click)=\"eraseShared()\" *ngIf=\"status && allElections.length == 0\" class=\"nav-link\" id=\"v-pills-create-tab\" data-toggle=\"pill\" href=\"#v-pills-create\" role=\"tab\" aria-controls=\"v-pills-create\" aria-selected=\"false\">Create</a>\n      <a (click)=\"eraseShared()\" *ngIf=\"status && ticket\" class=\"nav-link\" id=\"v-pills-ticket-tab\" data-toggle=\"pill\" href=\"#v-pills-ticket\" role=\"tab\" aria-controls=\"v-pills-ticket\" aria-selected=\"false\">Ticket</a>\n      <a (click)=\"eraseShared()\" *ngIf=\"vote && allElections.length > 0\" class=\"nav-link\" id=\"v-pills-vote-tab\" data-toggle=\"pill\" href=\"#v-pills-vote\" role=\"tab\" aria-controls=\"v-pills-vote\" aria-selected=\"false\">Vote\n        <span class=\"badge badge-primary\">{{ allElections.length }}</span>\n      </a>\n    </div>\n\n  </div>\n\n  <div class=\"col-lg-7 col-12\" style=\"margin-bottom:25px;\">\n    <div class=\"tab-content\" id=\"v-pills-tabContent\">\n\n      <!-- class list -->\n      <div class=\"tab-pane fade show active\" id=\"v-pills-students\" role=\"tabpanel\" aria-labelledby=\"v-pills-students-tab\">\n\n        <div *ngIf=\"errorMsg.length > 0\">\n          <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n            {{ e.msg }}\n          </div>\n        </div>\n        <div *ngIf=\"removedStudentMsg != ''\" class=\"alert alert-success\" role=\"alert\">\n            {{ removedStudentMsg }}\n        </div>\n        <div *ngIf=\"addedStudentMsg != ''\" class=\"alert alert-success\" role=\"alert\">\n            {{ addedStudentMsg }}\n        </div>\n\n        <form #searchClass=\"ngForm\">\n          <div class=\"form-group\">\n            <input [(ngModel)]=\"search.value\" name=\"value\" class=\"form-control\" type=\"text\" placeholder=\"Search students in {{ classroom.name }}...\">\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <input [(ngModel)]=\"search.searchBy\" name=\"searchBy\" class=\"form-check-input\" type=\"radio\" id=\"name\" value=\"name\">\n            <label class=\"form-check-label\" for=\"name\">Name</label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <input [(ngModel)]=\"search.searchBy\" name=\"searchBy\" class=\"form-check-input\" type=\"radio\" id=\"email\" value=\"email\">\n            <label class=\"form-check-label\" for=\"email\">E-mail</label>\n          </div>\n          <div *ngIf=\"status\" class=\"form-check form-check-inline\">\n            <input [(ngModel)]=\"search.searchBy\" name=\"searchBy\" class=\"form-check-input\" type=\"radio\" id=\"studentnumber\" value=\"studentnumber\">\n            <label class=\"form-check-label\" for=\"studentnumber\">Student Number</label>\n          </div>\n        </form>\n        <small style=\"display:block;margin-bottom:10px;margin-top:10px;\">\n          <b style=\"color:red;\">{{ classroom.joined }}/{{ classroom.students.length }} students have joined the class.</b>\n        </small>\n\n        <div style=\"max-height:500px;margin-bottom:30px;\" class=\"table-responsive\">\n          <table class=\"table table-hover\">\n            <thead>\n              <tr>\n                <th *ngFor=\"let heading of tableHeadings\" scope=\"col\">{{ heading | titlecase }}</th>\n                <th><i *ngIf=\"status\" class=\"material-icons\" style=\"font-size:20px;\" (click)=\"addStudent()\">person_add</i></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let student of classroom.students | userSearch:search.value:search.searchBy; index as i\">\n                <td>{{ student.email }}</td>\n                <td>{{ student.name | titlecase }}</td>\n                <td *ngIf=\"status\">{{ student.studentnumber }}</td>\n                <td><i *ngIf=\"status\" class=\"material-icons\" (click)=\"deleteStudent(student)\">delete</i></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <div *ngIf=\"add\" style=\"margin-top:25px;width:250px;\">\n          <h3>Add Student</h3>\n          <form #addToClass=\"ngForm\" (ngSubmit)=\"addNow(editStudent)\">\n            <div class=\"form-group\">\n              <label for=\"studentemail\">Email</label>\n              <input required [(ngModel)]=\"editStudent.email\" name=\"studentemail\" type=\"email\" class=\"form-control\" id=\"studentemail\" placeholder=\"Enter student email\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"studentname\">Name</label>\n              <input required [(ngModel)]=\"editStudent.name\" name=\"studentname\" type=\"text\" class=\"form-control\" id=\"studentname\" placeholder=\"Enter student name\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"studentnumber\">Student number</label>\n              <input required [(ngModel)]=\"editStudent.studentnumber\" name=\"studentnumber\" type=\"number\" class=\"form-control\" id=\"studentnumber\" placeholder=\"Enter student number\">\n            </div>\n            <button type=\"submit\" name=\"button\" class=\"btn btn-primary\" [disabled]=\"!addToClass.form.valid\">\n              <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n                <span class=\"sr-only\">Loading...</span>\n              </div>\n              Add Student\n            </button>\n          </form>\n        </div>\n\n      </div>\n\n\n      <!-- archive -->\n      <div class=\"tab-pane fade\" id=\"v-pills-history\" role=\"tabpanel\" aria-labelledby=\"v-pills-history-tab\">\n\n\n        <div *ngIf=\"history.length == 0; else previous\">\n          <h3 style=\"color:#d9d9d9\">No past elections for {{ classroom.name }}</h3>\n        </div>\n\n\n        <ng-template #previous>\n          <form>\n            <div class=\"form-group\">\n              <input [(ngModel)]=\"archiveSearch\" name=\"archiveSearch\" class=\"form-control\" type=\"text\" placeholder=\"Search...\">\n            </div>\n          </form>\n\n          <div *ngFor=\"let oldElection of history | archive:archiveSearch; index as i\" style=\"margin-bottom:10px;\">\n            <a *ngIf=\"oldElection.type == 'fpp'\" target=\"_blank\" rel=\"noopener\" routerLink=\"/election/fpp/{{oldElection._id}}\">{{ oldElection.title }}</a>\n            <a *ngIf=\"oldElection.type == 'stv'\" target=\"_blank\" rel=\"noopener\" routerLink=\"/election/stv/{{oldElection._id}}\">{{ oldElection.title }}</a>\n            <a *ngIf=\"oldElection.type == 'approval'\" target=\"_blank\" rel=\"noopener\" routerLink=\"/election/approval/{{oldElection._id}}\">{{ oldElection.title }}</a>\n          </div>\n        </ng-template>\n\n\n\n\n      </div>\n\n      <!-- vote -->\n      <div *ngIf=\"vote\" class=\"tab-pane fade\" id=\"v-pills-vote\" role=\"tabpanel\" aria-labelledby=\"v-pills-vote-tab\">\n\n        <div *ngIf=\"errorMsg.length > 0\">\n          <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n            {{ e.msg }}\n          </div>\n        </div>\n\n\n        <!-- access portal -->\n        <form #accessPoll=\"ngForm\" (ngSubmit)=\"access(password)\" *ngIf=\"!electionPermission; else allowed\">\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <input [disabled]=\"eKey\" [(ngModel)]=\"password\" name=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Please enter your key to access polls\">\n          </div>\n          <button *ngIf=\"!eKey; else secondary\" type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!accessPoll.form.valid\">Submit Key</button>\n          <ng-template #secondary>\n            <button type=\"submit\" class=\"btn btn-primary\" >Access Poll</button>\n          </ng-template>\n        </form>\n\n\n        <ng-template #allowed>\n\n          <div *ngFor=\"let activeElection of allElections; index as i\" style=\"margin-bottom:10px;\" class=\"electionBox\">\n            <div *ngIf=\"activeElection.type == 'fpp'\">\n              <h3 ><i *ngIf=\"status\" class=\"material-icons deleteElection\" (click)=\"deleteElectionModal(i)\">delete_outline</i> <a routerLink=\"/election/fpp/{{activeElection._id}}\" target=\"_blank\" rel=\"noopener\"> {{ activeElection.title }}</a></h3><span style=\"color:red;font-weight:bold;\">[{{countdownTimes[i].time}}]</span>\n            </div>\n            <div *ngIf=\"activeElection.type == 'stv'\">\n              <h3><i *ngIf=\"status\" class=\"material-icons deleteElection\" (click)=\"deleteElectionModal(i)\">delete_outline</i> <a routerLink=\"/election/stv/{{activeElection._id}}\" target=\"_blank\" rel=\"noopener\"> {{ activeElection.title }}</a></h3><span style=\"color:red;font-weight:bold;\">[{{countdownTimes[i].time}}]</span>\n            </div>\n            <div *ngIf=\"activeElection.type == 'approval'\">\n              <h3><i *ngIf=\"status\" class=\"material-icons deleteElection\" (click)=\"deleteElectionModal(i)\">delete_outline</i> <a routerLink=\"/election/approval/{{activeElection._id}}\" target=\"_blank\" rel=\"noopener\"> {{ activeElection.title }}</a></h3><span style=\"color:red;font-weight:bold;\">[{{countdownTimes[i].time}}]</span>\n            </div>\n\n          </div>\n\n        </ng-template>\n\n      </div>\n\n      <!-- create elections -->\n      <div *ngIf=\"status\" class=\"tab-pane fade\" id=\"v-pills-create\" role=\"tabpanel\" aria-labelledby=\"v-pills-create-tab\">\n\n        <div *ngIf=\"errorMsg.length > 0\">\n          <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n            {{ e.msg }}\n          </div>\n        </div>\n\n        <form (ngSubmit)=\"addToElectionSheet()\" #electionCreate=\"ngForm\">\n          <div class=\"form-group\">\n            <label for=\"\" class=\"elecTypes\" (click)=\"electionTypes()\"><span class=\"material-icons\" style=\"font-size:17px;vertical-align:middle\">help_outline</span> Election type</label><br>\n            <div class=\"form-check form-check-inline\">\n              <input [(ngModel)]=\"election.typeof\" class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"fpp\" value=\"fpp\">\n              <label class=\"form-check-label\" for=\"fpp\">FPP</label>\n            </div>\n            <div class=\"form-check form-check-inline\">\n              <input [(ngModel)]=\"election.typeof\" class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"stv\" value=\"stv\">\n              <label class=\"form-check-label\" for=\"stv\">STV</label>\n            </div>\n            <div class=\"form-check form-check-inline\">\n              <input [(ngModel)]=\"election.typeof\" class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"approval\" value=\"approval\">\n              <label class=\"form-check-label\" for=\"approval\">Approval</label>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"exampleFormControlSelect1\">How many candidates to be elected?</label>\n            <select [(ngModel)]=\"election.vacancies\" name=\"vacancies\" class=\"form-control\" id=\"exampleFormControlSelect1\">\n              <option value=\"1\">1</option>\n              <option value=\"2\">2</option>\n              <option value=\"3\">3</option>\n              <option value=\"4\">4</option>\n              <option value=\"5\">5</option>\n            </select>\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"electionName\">Title</label>\n            <input required [(ngModel)]=\"election.title\" name=\"title\" type=\"text\" class=\"form-control\" id=\"electionName\"\n            aria-describedby=\"electionTitle\" placeholder=\"Election title\" maxlength=\"150\">\n            <small id=\"electionTitle\" class=\"form-text text-muted\" *ngIf=\"election.title != undefined; else noTitle\">\n             {{ 150 - election.title.length }} characters left.\n            </small>\n            <ng-template #noTitle>\n              <small id=\"electionTitle\" class=\"form-text text-muted\">\n                150 characters left.\n              </small>\n            </ng-template>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"electionDescription\">Description</label>\n            <textarea required [(ngModel)]=\"election.description\" placeholder=\"Provide a brief description\" name=\"description\" class=\"form-control\" id=\"electionDescription\" rows=\"3\" maxlength=\"500\"></textarea>\n            <small *ngIf=\"election.description != undefined; else noinput\">{{ 500 - election.description.length }} characters left.</small>\n            <ng-template #noinput>\n              <small>500 characters</small>\n            </ng-template>\n          </div>\n          <div class=\"form-group\">\n            <form (ngSubmit)=\"addResource()\" #links=\"ngForm\">\n              <span>Election Resources</span><br>\n              <small>Copy and paste outside resources, e.g. youtube links to election platforms.</small>\n              <input [(ngModel)]=\"resource\" name=\"source\" class=\"form-control\" type=\"text\" placeholder=\"Link\">\n              <button type=\"submit\" style=\"display:none;\" name=\"button\"></button>\n              <div *ngFor=\"let r of allResources;index as i\" style=\"margin-top:5px;\" (mouseleave)=\"exitResource=false\" (mouseenter)=\"exitResource=true\">\n                <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span><a href=\"{{r}}\" target=\"_blank\" rel=\"noopener\">{{r}}</a>\n                <span *ngIf=\"exitResource\" class=\"material-icons removeResource\" (click)=\"deleteLink(i)\">cancel</span>\n              </div>\n            </form>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"searchClass\">Search</label>\n            <input [(ngModel)]=\"info\" name=\"info\" type=\"text\" class=\"form-control\" id=\"searchClass\" placeholder=\"Search class\">\n          </div>\n          <div class=\"form-group selection\">\n            <small [ngClass]=\"{'s':selectCan == true}\" (click)=\"settingOptions('can')\">Candidates</small> | <small [ngClass]=\"{'s':selectCan == false}\" (click)=\"settingOptions('res')\">Restrictions</small>\n          </div>\n          <form *ngIf=\"selectCan; else restrict\" style=\"max-height:150px;overflow:scroll\">\n            <div *ngFor=\"let person of classroom.students | search:info\" class=\"form-group form-check\">\n              <input [(ngModel)]=\"candidates[person.studentnumber]\"\n              value=\"true\" name=\"candidates_{{person.studentnumber}}\" type=\"checkbox\"\n              class=\"form-check-input\" id=\"{{person.studentnumber}}\">\n              <label class=\"form-check-label\" for=\"{{person.studentnumber}}\">{{ person.name | titlecase }} / {{ person.studentnumber }}</label>\n            </div>\n          </form>\n          <ng-template #restrict>\n            <form style=\"max-height:150px;overflow:scroll\">\n              <div *ngFor=\"let person of classroom.students | search:info\" class=\"form-group form-check\">\n                <input [(ngModel)]=\"restrictCan[person.studentnumber]\"\n                value=\"true\" name=\"restrictCan_{{person.studentnumber}}\" type=\"checkbox\"\n                class=\"form-check-input\" id=\"{{person.studentnumber}}\">\n                <label class=\"form-check-label\" for=\"{{person.studentnumber}}\">{{ person.name | titlecase }} / {{ person.studentnumber }}</label>\n              </div>\n            </form>\n          </ng-template>\n          <div class=\"form-group\">\n            <label for=\"electionDuration\">Duration</label>\n            <input required [(ngModel)]=\"election.duration\" name=\"duration\" type=\"number\" class=\"form-control\" id=\"electionDuration\" aria-describedby=\"electionTime\" placeholder=\"Hours\">\n            <small id=\"electionDuration\" class=\"form-text text-muted\">Times are in hours.\n              <b *ngIf=\"election.duration % 1 != 0 && election.duration != undefined\" style=\"color:red;\">\n                {{ election.duration * 60 | number:\"1.0-0\" }}m\n              </b>\n\n            </small>\n          </div>\n\n          <button type=\"submit\" class=\"btn btn-outline-primary btn-block\" [disabled]=\"!electionCreate.form.valid\">\n            <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm\" role=\"status\">\n              <span class=\"sr-only\">Loading...</span>\n            </div>\n            + Add\n          </button>\n\n\n        </form>\n\n      </div>\n\n      <!-- ticket -->\n      <div *ngIf=\"status && ticket\" class=\"tab-pane fade\" id=\"v-pills-ticket\" role=\"tabpanel\" aria-labelledby=\"v-pills-ticket-tab\">\n        <div *ngIf=\"errorMsg.length > 0\">\n          <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n            {{ e.msg }}\n          </div>\n        </div>\n        <div class=\"alert alert-info\" role=\"alert\">\n          Please review election details carefully before submission. If you navigate away from the current classroom all details will be lost and need to be re-entered.\n        </div>\n        <div *ngFor=\"let election of electionSheet; index as i\">\n          <h4><i class=\"material-icons cancelElection\" style=\"font-size:20px;\" (click)=\"delete(i)\">cancel</i> {{ election.title }}</h4>\n          <p>Type of election: <b>{{ election.type | uppercase }}</b></p>\n          <p *ngIf=\"election.vacancies\">To be elected: <b>{{ election.vacancies }}</b></p>\n          <p>{{ election.description }}</p>\n          <p>This poll will be up for <span style=\"color:red;\">{{ election.duration }} hour(s)</span></p>\n          <p *ngIf=\"election.links.length > 0\">Resources:\n            <span style=\"margin-right:5px;\" *ngFor=\"let url of election.links\">\n              <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n              <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n            </span>\n          </p>\n          <p>Candidates:\n            <b *ngFor=\"let candidate of election.candidates | keyvalue\"> {{ candidate.key }} /</b>\n          </p>\n          <p *ngIf=\"(election.restrictions | json) != '{}'\">Restrictions:\n            <b *ngFor=\"let restricted of election.restrictions | keyvalue\"> {{ restricted.key }} /</b>\n          </p>\n        </div>\n        <button type=\"button\" class=\"btn btn-outline-primary btn-block\" (click)=\"poll(electionSheet,classroom.name)\">\n          <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Create election!\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/create/create.component.html":
/*!************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/create/create.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<nav *ngIf=\"student.classrooms_master.length > 0 || student.classrooms_student.length > 0\" aria-label=\"breadcrumb\" class=\"toolbar\">\n  <ol class=\"breadcrumb master\" style=\"margin-bottom:5px;\">\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_master of student.classrooms_master\">\n      <a routerLink=\"/classroom/{{classroom_master.name}}\"><i class=\"material-icons\" style=\"font-size:12px;\">vpn_key</i> {{ classroom_master.name }}</a>\n    </li>\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_student of student.classrooms_student\">\n      <a routerLink=\"/classroom/{{classroom_student.name}}\">{{ classroom_student.name }}</a>\n    </li>\n  </ol>\n</nav>\n\n<div class=\"row justify-content-between\" style=\"margin-top:10px;margin-bottom:20px;\">\n  <div class=\"col-lg-5 col-12\">\n    <div style=\"font-size:15px;\" *ngIf=\"errorMsg.length > 0\">\n      <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n        {{ e.msg }}\n      </div>\n    </div>\n\n    <form #classRegistration=\"ngForm\">\n      <div class=\"form-group\">\n        <label for=\"school\">School</label>\n        <select required [(ngModel)]=\"classInformation.school\" name=\"school\" class=\"form-control\" id=\"school\">\n          <option *ngFor=\"let school of schools\" [value]=\"school\">{{ school }}</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"classroom\">Classroom name</label><br>\n        <small>This is how students will be able to find the classroom.</small>\n        <input required [(ngModel)]=\"classInformation.classname\" name=\"classname\" type=\"text\" class=\"form-control\" id=\"classroom\" placeholder=\"Enter class name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label><br>\n        <small>This is how students will be able to access the classroom.</small>\n        <input required [(ngModel)]=\"classInformation.password\" name=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Enter password\">\n      </div>\n      <div *ngIf=\"partakeInPolls\" class=\"form-group\">\n        <label for=\"\">Will you be partaking in polls with this classroom?</label><br>\n        <div class=\"form-check form-check-inline\">\n          <input required [(ngModel)]=\"classInformation.partake\" name=\"partake\" value=\"true\" class=\"form-check-input\" type=\"radio\" id=\"partake\">\n          <label class=\"form-check-label\" for=\"partake\">Yes</label>\n        </div>\n        <div class=\"form-check form-check-inline\">\n          <input required [(ngModel)]=\"classInformation.partake\" name=\"notpartake\" value=\"false\" class=\"form-check-input\" type=\"radio\"\n          id=\"notpartake\">\n          <label class=\"form-check-label\" for=\"notpartake\">No</label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"classlist\">Please upload a class list in CSV format with the following headings as your first row: <mark style=\"background-color:yellow;\"><b>name,studentnumber,email</b></mark></label><br>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"browse()\" style=\"padding:5px; width: 100%;\">\n          Upload\n          <input required #fileInput type=\"file\" (change)=\"classInput($event.target.files)\" style=\"display:none;\" id=\"classlist\" />\n        </button>\n      </div>\n      <div class=\"form-group\" *ngIf=\"filename != ''\">\n        <span class=\"badge badge-primary\" style=\"padding:5px;font-weight:normal;\">'{{ filename }}' has been successfully uploaded.</span>\n      </div>\n    </form>\n\n\n\n  </div>\n  <div *ngIf=\"processed\" class=\"col-lg-7 col-12\">\n    <div class=\"row\">\n      <div class=\"col-10\">\n        <form #searchClass=\"ngForm\">\n          <div class=\"form-group\">\n            <input [disabled]=\"edit\" [(ngModel)]=\"search.value\" name=\"value\" class=\"form-control\" type=\"text\" placeholder=\"Search students...\">\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <input [(ngModel)]=\"search.searchBy\" name=\"searchBy\" class=\"form-check-input\" type=\"radio\" id=\"name\" value=\"name\">\n            <label class=\"form-check-label\" for=\"name\">Name</label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <input [(ngModel)]=\"search.searchBy\" name=\"searchBy\" class=\"form-check-input\" type=\"radio\" id=\"email\" value=\"email\">\n            <label class=\"form-check-label\" for=\"email\">E-mail</label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <input [(ngModel)]=\"search.searchBy\" name=\"searchBy\" class=\"form-check-input\" type=\"radio\" id=\"studentID\" value=\"studentnumber\">\n            <label class=\"form-check-label\" for=\"studentID\">Student Number</label>\n          </div>\n        </form>\n      </div>\n    </div>\n    <!-- table of students -->\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"table-responsive\" style=\"max-height:500px\">\n          <table class=\"table table-hover\" style=\"margin-top:30px;\">\n            <thead>\n              <tr>\n                <th *ngFor=\"let heading of tableHeadings\" scope=\"col\"> {{ heading | titlecase }}</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let student of students| userSearch:search.value:search.searchBy; index as i\">\n                <td>{{ student.email }}</td>\n                <td>{{ student.name }}</td>\n                <td>{{ student.studentnumber }}</td>\n                <td><i class=\"material-icons\" (click)=\"deleteRow(student)\">delete_outline</i></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n    <!-- Edit of students -->\n\n    <div class=\"row\" style=\"margin-top:30px;margin-bottom:30px;\">\n      <div class=\"col-12\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"createClass()\" [disabled]=\"isLoading\">\n          <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Looks good? Create class now!\n        </button>\n      </div>\n\n    </div>\n\n  </div>\n\n\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/dashboard/dashboard.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/dashboard/dashboard.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<!-- Restricted ? -->\n<div style=\"font-weight:13px;margin-bottom:0px;padding-top:8px;padding-bottom:8px;\" *ngIf=\"restricted\" class=\"alert alert-danger\" role=\"alert\">\n  You are not apart of this classroom.\n</div>\n<div *ngIf=\"errorMsg.length > 0\">\n  <div style=\"font-weight:13px;margin-bottom:5px;padding-top:8px;padding-bottom:8px;margin-top:5px;\" *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n    {{ e.msg }}\n  </div>\n</div>\n\n\n<nav *ngIf=\"student.classrooms_master.length > 0 || student.classrooms_student.length > 0\" aria-label=\"breadcrumb\" class=\"toolbar\">\n  <ol class=\"breadcrumb master\" style=\"margin-bottom:10px;\">\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_master of student.classrooms_master\">\n      <a routerLink=\"/classroom/{{classroom_master.name}}\"><i class=\"material-icons\" style=\"font-size:12px;\">vpn_key</i> {{ classroom_master.name }}</a>\n    </li>\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_student of student.classrooms_student\">\n      <a routerLink=\"/classroom/{{classroom_student.name}}\">{{ classroom_student.name }}</a>\n    </li>\n  </ol>\n</nav>\n\n<!-- Button trigger modal -->\n<button #triggerModal style=\"display:none;\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\">\n</button>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">{{ modalTitle }} classroom password</h5>\n        <button #exit type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form #classPass=\"ngForm\" (ngSubmit)=\"classPassword(password)\">\n          <div class=\"form-group\">\n            <input [(ngModel)]=\"password\" name=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n          </div>\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!classPass.form.valid || isLoadingPass\">\n            <div *ngIf=\"isLoadingPass\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n              <span class=\"sr-only\">Loading...</span>\n            </div>\n            Unlock <span style=\"vertical-align:middle;font-size:13px;\" class=\"material-icons\">lock</span></button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div style=\"border-radius:0px;\" class=\"jumbotron\">\n  <h4 class=\"display-4\">Hello, {{ student.firstname | titlecase }}!</h4>\n  <p class=\"lead\">All classrooms are password protected. Search below by inputting the classroom name.</p>\n\n  <form #classroomSearch=\"ngForm\" (ngSubmit)=\"find(query)\">\n    <div class=\"input-group input-group-lg\">\n      <div class=\"input-group-prepend\">\n        <span class=\"input-group-text\" id=\"inputGroup-sizing-lg\">\n          <div *ngIf=\"isLoading\" class=\"spinner-border text-primary spinner-border-sm\" role=\"status\" style=\"margin-right:5px;\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Name\n        </span>\n      </div>\n      <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-lg\" placeholder=\"Search...\" [disabled]=\"isLoading\">\n      <button type=\"submit\" style=\"display:none;\" name=\"button\"></button>\n    </div>\n  </form>\n\n  <hr class=\"my-4\">\n  <p>Don't have a classroom for your class? Create one!</p>\n  <a class=\"btn btn-primary\" routerLink=\"/create\" role=\"button\">Create</a>\n\n</div>\n\n<div *ngIf=\"displaySearchQuery\" class=\"row\" style=\"margin-bottom:50px;\">\n  <div class=\"col-12\" style=\"margin-bottom:15px;\">\n    <span>Query: <b>\"{{ displaySearchQuery }}\"</b> / ({{ classes.length }})</span>\n  </div>\n  <div *ngIf=\"classes.length > 0; else noresultsfound\" class=\"col-12\" style=\"padding:0px;\">\n    <div class=\"col-12\" *ngFor=\"let class of classes\" style=\"margin-bottom:10px;\">\n      <span *ngIf=\"locked(class.name); else unlocked\">\n        <span class=\"classname\" (click)=\"open(class.name)\">\n          <span class=\"material-icons\" style=\"font-size:12px;\">lock</span>\n        {{ class.name }}\n      </span><br>\n      </span>\n      <ng-template #unlocked>\n        <span class=\"classname\">\n          <a class=\"unlockedClass\" routerLink=\"/classroom/{{class.name}}\">{{ class.name }}</a>\n        </span><br>\n      </ng-template>\n\n\n      <span>{{ class.school }}</span>\n    </div>\n  </div>\n  <ng-template #noresultsfound>\n    <div class=\"col-12\">\n      <span>No classrooms found.</span>\n    </div>\n  </ng-template>\n\n  <!-- Pagination -->\n  <div *ngIf=\"pages.length > 1\" class=\"col-12\">\n    <nav aria-label=\"...\">\n      <ul class=\"pagination pagination-sm\">\n        <li *ngFor=\"let page of pages\" class=\"page-item\">\n          <a class=\"page-link\" (click)=\"currentPage(page)\">{{ page }}</a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/forgot-password/forgot-password.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/forgot-password/forgot-password.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\" style=\"margin-top:50px;\">\n  <div class=\"col-10 col-lg-4\">\n      <h2 style=\"text-align:center;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i><a routerLink=\"/login\" style=\"color:black;text-decoration:none;\">Select polling</a></h2>\n\n      <div *ngIf=\"errorMsg.length > 0\">\n        <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n          {{ e.msg }}\n        </div>\n      </div>\n\n      <div *ngIf=\"success\" class=\"alert alert-info\" role=\"alert\">\n        Please check your email.\n      </div>\n\n      <form (ngSubmit)=\"reset(user)\" #forgotPassword=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"email\">E-mail</label><br>\n          <input required [(ngModel)]=\"user.email\" name=\"email\" type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\">\n          <small>Further instructions will be provided in the e-mail.</small><br>\n          <small><span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;margin-right:5px;\">help</span> contact@selectpolling.ca</small>\n        </div>\n        <button style=\"width:100%;\" type=\"submit\" class=\"btn btn-primary login\" [disabled]=\"!forgotPassword.form.valid || isLoading\">\n          <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Send\n        </button>\n      </form>\n\n\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/fpp/fpp.component.html":
/*!******************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/fpp/fpp.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<div class=\"row justify-content-center\" style=\"margin-top:25px;\">\n  <div class=\"col-lg-6 col-12\">\n    <div *ngIf=\"success\" class=\"alert alert-info\" role=\"alert\">\n      Thanks for placing your vote!\n    </div>\n\n    <div *ngIf=\"errorMsg.length > 0\">\n      <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n        {{ e.msg }}\n      </div>\n    </div>\n\n    <div *ngIf=\"election.type == 'fpp' && election.status\">\n      <h3>{{ election.title }}</h3>\n      <span (click)=\"electionTypes()\"><span class=\"material-icons\" style=\"font-size:17px;vertical-align:middle\">help_outline</span> Election type: <b>{{ election.type | uppercase }}</b></span><br>\n      <span>Please select a single candidate.</span><br>\n      <span>To be elected: <b>{{ election.vacancies }}</b></span><br>\n      <span style=\"margin-right:5px;\" *ngFor=\"let url of election.links\">\n        <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n        <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n      </span>\n      <p>{{ election.description }}</p>\n      <span>Duration: {{ election.duration }} hour(s)</span><br>\n      <span style=\"color:red;margin-bottom:10px;\">Remaining:\n\n          <b>{{ countdownTime[0].time }}</b>\n\n      </span>\n      <div *ngFor=\"let candidate of election.candidates;index as idx\" style=\"margin-bottom:10px;\">\n        <span><b>[{{ countOb[candidate._id]}}]</b> {{ candidate.name | titlecase }} </span>\n        <span *ngIf=\"countdownTime[0].time != 'expired' && studentVoterStatus[user.studentnumber] === false\"\n        class=\"badge badge-pill badge-success voteButton\" (click)=\"myVote(election._id,candidate,'fpp')\">VOTE</span>\n        <div class=\"progress\" style=\"margin-top:10px;\">\n          <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\"studentWidths[candidate._id]\">\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div *ngIf=\"election.type == 'fpp' && !election.status\">\n      <highcharts-chart\n         [Highcharts] = \"highcharts\"\n         [options] = \"chartInfo\"\n         style = \"width: 100%; height: 300px; display: block;\">\n      </highcharts-chart>\n      <div style=\"text-align:center\">\n        Created: {{ election.date | date:\"medium\" }}<br>\n        Duration: {{ election.duration }} hours<br>\n        <span *ngIf=\"election.type\">Type of election: <b>{{ election.type | uppercase }}</b></span><br>\n        <span *ngIf=\"election.vacancies\">To be elected: <b>{{ election.vacancies }}</b><br>\n          <span>Total votes: <b>{{ election.total }}</b></span>\n        </span><br>\n        <span><b style=\"color:red;\">Winner(s):</b> <span *ngFor=\"let student of election.winners\"> {{ student.name }} <i class=\"fas fa-check check\"></i></span></span>\n\n        <div>\n          <span *ngFor=\"let url of election.links\">\n            <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n            <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n          </span>\n        </div>\n      </div>\n      <div style=\"text-align:center\">{{ election.description }}</div>\n    </div>\n\n    <div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n      <div class=\"col-12\">\n        <footer style=\"text-align:center;font-size:12px\">\n          2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n          <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n          <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n        </footer>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.component.html":
/*!********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row align-items-center\">\n    <div class=\"col-lg-5 col-12\">\n      <h1 style=\"margin-top:15px;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select Polling</h1>\n      <ul class=\"features\">\n        <li>Create class council elections quick and easy.</li>\n        <li>First-past-the-post, approval voting, single transferable voting, and preferential voting (instant-runoff). <a routerLink=\"/whatis\">What are these?</a></li>\n        <li>Secure - one way hashing algorithms are used to encrypt your election key.</li>\n        <li>Private - no one will ever know who you vote for but you.</li>\n        <li>Avoid the double voting problem that can be seen with more traditional methods of running small scale class council elections using popular online survey tools.</li>\n        <li>Election history displayed with interactive charts.</li>\n        <li>Real time results.</li>\n      </ul>\n      <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"login()\">Have an account? Login</button>\n      <button type=\"button\" class=\"btn btn-primary\" style=\"margin-left:10px;\" (click)=\"register()\">Sign up!</button>\n    </div>\n    <div class=\"col-lg-7 col-12\">\n      <img src=\"assets/ballot.jpeg\" alt=\"voting\" style=\"max-width:100%;\">\n    </div>\n  </div>\n\n\n  <div class=\"row\">\n    <div class=\"col-12\" style=\"padding:0px;\">\n      <div class=\"jumbotron jumbotron-fluid\" style=\"background-color:#f8f8f8;margin-bottom:0px;border-radius:15px;\">\n        <div class=\"container\">\n          <h3>How it works?</h3>\n          <p class=\"lead\"><b>Student:</b></p>\n          <ol>\n            <li>Register with your school email.</li>\n            <li>Join classrooms by searching for them and entering their corresponding password, or you can create a classroom that is password protected.</li>\n            <li>Create elections for classrooms that you have created, or vote in elections for classrooms that you are apart of.</li>\n          </ol>\n          <p class=\"lead\"><b>Non-student:</b></p>\n          <ol>\n            <li>Register with your school email.</li>\n            <li>Create password protected classrooms.</li>\n            <li>Create elections for classrooms that you have created.</li>\n          </ol>\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <div class=\"row\" style=\"margin-top:25px;margin-bottom:25px;\">\n    <div class=\"col-12\" style=\"margin-bottom:20px;\">\n      <h4>So, what does it look like? Here's an example of an active election and an archived election.</h4>\n    </div>\n    <div class=\"col-lg-5 col-12\" style=\"margin-top:20px'\">\n      <div>\n        <h5>Class Presidential Election</h5>\n        <span class=\"elec-type\" (click)=\"electionTypes()\"><span class=\"material-icons\" style=\"font-size:17px;vertical-align:middle\">help_outline</span> Election type: <b>FPP</b></span><br>\n        <span>Please select a single candidate.</span><br>\n        <span>To be elected: <b>1</b></span><br>\n        <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span><a href=\"http://www.example.com\" target=\"_blank\" rel=\"noopener\">https://www.example.com</a>\n        <p>This is for class president. Please review all materials that have been linked before voting. Best of luck to everyone.</p>\n        <span>Duration: 0.5 hour(s)</span><br>\n        <span style=\"color:red;margin-bottom:10px;\"*ngIf=\"timeLeft != 'expired';else done\">Remaining: <b>0h:{{timeLeft}}m</b><br></span>\n        <ng-template #done>\n          <span style=\"color:red;margin-bottom:10px;\">Remaining: <b>{{timeLeft}}</b><br></span>\n        </ng-template>\n        <span><b>[{{johnCount}}]</b> John Smith</span>\n        <div class=\"progress\">\n          <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\"john\"></div>\n        </div>\n        <span><b>[{{janeCount}}]</b> Jane Smith</span>\n        <div class=\"progress\">\n          <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\"jane\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-6 col-12\" style=\"margin-top:20px;\">\n      <highcharts-chart\n         [Highcharts] = \"highcharts\"\n         [options] = \"chartOptions\"\n         style = \"width: 100%; height: 300px; display: block;\">\n      </highcharts-chart>\n      <div class=\"\" style=\"text-align:center;\">\n        Created: May 26, 2020<br>\n        Duration: 0.5 hour(s)<br>\n        Type of election:<b>FPP</b><br>\n        To be elected: <b>1</b><br>\n        <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span><a href=\"http://www.anotherexample.com\" target=\"_blank\" rel=\"noopener\">https://www.anotherexample.com</a>\n        <p style=\"text-align:center;\">This is for Senior Stick of the Civil Engineering department. Before submitting your votes, please look at all election platforms (refer to attached link).</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n    <div class=\"col-12\">\n      <footer style=\"text-align:center;font-size:12px\">\n        2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n        <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n        <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n      </footer>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/login/login.component.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/login/login.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\" style=\"margin-top:50px;\">\n  <div class=\"col-10 col-lg-4\">\n      <h2 style=\"text-align:center;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i><a routerLink=\"/\" style=\"color:black;text-decoration:none;\">Select polling</a></h2>\n      <div *ngIf = \"msg != ''\" class=\"alert alert-info\" role=\"alert\">\n        {{ msg }}\n      </div>\n\n      <div *ngIf=\"errorMsg.length > 0\">\n        <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n          {{ e.message || e.msg }}\n        </div>\n      </div>\n\n      <form (ngSubmit)=\"login(student)\" #studentLogin=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"username\">Username</label>\n          <input required [(ngModel)]=\"student.username\" name=\"username\" type=\"text\"\n          minlength=\"4\" maxlength=\"12\" class=\"form-control\" id=\"username\" placeholder=\"Username\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input required [(ngModel)]=\"student.password\" name=\"password\" type=\"password\"\n          minlength=\"4\" maxlength=\"12\" class=\"form-control\" id=\"password\" placeholder=\"Password\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary login\" [disabled]=\"!studentLogin.form.valid || isLoading\">\n          <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Login\n        </button>\n        <small>Don't have an account? <a routerLink=\"/register\">Register now!</a> </small><br>\n        <small><a routerLink=\"/reset\">Forgot your password?</a></small><br>\n        <small><span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span> contact@selectpolling.ca</small><br>\n        <small><span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;margin-right:5px;\">local_library</span>  <a routerLink=\"/manual\">FAQ</a></small>\n      </form>\n\n  </div>\n</div>\n\n<div class=\"row justify-content-center\" style=\"margin-top:50px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manual/manual.component.html":
/*!************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manual/manual.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n</nav>\n\n<div class=\"row justify-content-center\" style=\"margin-top:20px;margin-bottom:50px;\">\n  <div class=\"col-10 col-lg-8\">\n    <h2 style=\"text-align:center;margin-bottom:20px;\"><span class=\"material-icons\">local_library</span> FAQ</h2>\n\n    <div class=\"questions\" style=\"margin-bottom:40px;\">\n      <a (click)=\"scrollTo('roles')\">What's the difference between registering as a student vs. non-student?</a><br>\n      <a (click)=\"scrollTo('ekey')\">What is an election key?</a><br>\n      <a (click)=\"scrollTo('create')\">How to create a classroom?</a><br>\n      <a (click)=\"scrollTo('join')\">How to join a classroom?</a><br>\n      <a (click)=\"scrollTo('leave')\">How do I leave a classroom?</a><br>\n      <a (click)=\"scrollTo('delete')\">How do I delete a classroom?</a><br>\n      <a (click)=\"scrollTo('delAcc')\">How do I delete my account?</a><br>\n      <a (click)=\"scrollTo('createElec')\">How do I create an election?</a><br>\n      <a (click)=\"scrollTo('password')\">How do I change my password?</a><br>\n      <a (click)=\"scrollTo('restrictions')\">When creating an election what are the restrictions setting?</a><br>\n      <a (click)=\"scrollTo('schoolsupport')\">How can I get support for my student council elections if I am not from the University of Manitoba?</a><br>\n      <a (click)=\"scrollTo('editelec')\">Can I edit elections after they’ve been created?</a><br>\n      <a (click)=\"scrollTo('addingtoElect')\">Can I add to an election ticket if I had ongoing elections?</a><br>\n      <a (click)=\"scrollTo('notstudent')\">If I am not a student can I be added to a classroom?</a><br>\n      <a (click)=\"scrollTo('limits')\">What are the limits?</a><br>\n    </div>\n\n\n    <div id=\"roles\">\n      <h5>Registering as a student vs. non-student?</h5>\n      If you register as a student (i.e. providing a student number and election key during registration), you will be able to create classrooms, join classrooms, and vote in elections. However, if you register as a non-student, you will only be able to create classrooms.\n    </div>\n    <div id=\"ekey\">\n      <h5>What is an election key?</h5>\n      The election key is a user generated password that is required to access access codes for elections. It is created by you at the time of registration and is your ticket by which you will be able to vote in polls for whatever classrooms you join. Unlike your password that you use for logging in, you cannot change your election key once it is created.\n    </div>\n    <div id=\"create\">\n      <h5>How to create a classroom?</h5>\n      To create a classroom, click the \"create\" button in the dashboard view. Class lists must be uploaded in CSV format with the following headings as the first row:  \"<mark style=\"background-color:yellow;\"><b>name,studentnumber,email</b></mark>\"\n    </div>\n    <div id=\"join\">\n      <h5>How to join a classroom?</h5>\n      Upon successful login, search for the classroom in the dashboard view then click the classroom and enter its password. If you are in the class list, which was created by the admin, you will be granted access. Otherwise,  no.\n    </div>\n    <div id=\"leave\">\n      <h5>How do I leave a classroom?</h5>\n      Leaving a classroom can be done in the profile view by clicking on its respective trash icon and then entering your password.\n    </div>\n    <div id=\"delete\">\n      <h5>How do I delete a classroom?</h5>\n      Deleting a classroom can be done in the profile view by clicking on its respective trash icon and entering the class password. This action can only be performed by admins (aka the creator of the class)\n    </div>\n    <div id=\"delAcc\">\n      <h5>How do I delete my account?</h5>\n      This can be done in the profile view.\n    </div>\n    <div id=\"createElec\">\n      <h5>How do I create an election?</h5>\n      To create an election in a classroom, you must be the admin. To achieve this, simply go to the create tab in the classroom view and fill out the form with the election details. After you are satisfied with the details, click “+Add”, which will add the election to a ticket. Election tickets can be as large as 20 elections.\n    </div>\n    <div id=\"password\">\n      <h5>How do I change my password?</h5>\n      Profile view.\n    </div>\n    <div id=\"restrictions\">\n      <h5>When creating an election what are the restrictions setting?</h5>\n      Restrictions will allow the admin of a classroom to prevent certain people in the classroom from voting in elections.\n    </div>\n    <div id=\"schoolsupport\">\n      <h5>How can I get support for my student council elections if I am not from the University of Manitoba?</h5>\n      contact@selectpolling.ca\n    </div>\n    <div id=\"editelec\">\n      <h5>Can I edit elections after they’ve been created?</h5>\n      No you cannot.\n    </div>\n    <div id=\"addingtoElect\">\n      <h5>Can I add to an election ticket if I had ongoing elections?</h5>\n      No you cannot.\n    </div>\n    <div id=\"changingEkey\">\n      <h5>Is there any way to change my election key after I have registered?</h5>\n      No you cannot. However, if you have forgotten your election key or are concerned that someone may have access to it you can contact us at contact@selectpolling.ca\n    </div>\n    <div id=\"notstudent\">\n      <h5>If I am not a student can I be added to a classroom?</h5>\n      No you cannot.\n    </div>\n    <div id=\"limits\">\n      <h5>What are the limits?</h5>\n      Election ticket: up to 20 elections<br>\n      Candidates per election: minimum 1<br>\n      Classroom size: 4-500<br>\n      Archive: 100 elections (if more than 100 elections are present in the archive, the oldest ones get removed first)\n    </div>\n\n\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/privacy/privacy.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/privacy/privacy.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <nav class=\"navbar navbar-light bg-light\">\n      <a class=\"navbar-brand\" routerLink=\"/\"><h4 style=\"margin:0px;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select Polling</h4></a>\n    </nav>\n  </div>\n</div>\n<div class=\"row\" style=\"margin-top:20px;\">\n  <div class=\"col-12\">\n\n    <h1>Privacy Policy</h1>\n    <p>Last updated: May 27, 2020</p>\n    <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>\n    <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href=\"https://www.termsfeed.com/privacy-policy-generator/\" target=\"_blank\">Privacy Policy Generator</a>.</p>\n    <h1>Interpretation and Definitions</h1>\n    <h2>Interpretation</h2>\n    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.\n    The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>\n    <h2>Definitions</h2>\n    <p>For the purposes of this Privacy Policy:</p>\n    <ul>\n    <li>\n    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>\n    </li>\n    <li>\n    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Select Polling.</p>\n    </li>\n    <li>\n    <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>\n    </li>\n    <li>\n    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>\n    </li>\n    <li>\n    <p><strong>Website</strong> refers to Select Polling, accessible from <a href=\"https://www.selectpolling.ca\" rel=\"external nofollow noopener\" target=\"_blank\">https://www.selectpolling.ca</a></p>\n    </li>\n    <li>\n    <p><strong>Service</strong> refers to the Website.</p>\n    </li>\n    <li>\n    <p><strong>Country</strong> refers to: Manitoba,  Canada</p>\n    </li>\n    <li>\n    <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>\n    </li>\n    <li>\n    <p><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>\n    </li>\n    <li>\n    <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>\n    </li>\n    <li>\n    <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>\n    </li>\n    <li>\n    <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>\n    </li>\n    <li>\n    <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>\n    </li>\n    </ul>\n    <h1>Collecting and Using Your Personal Data</h1>\n    <h2>Types of Data Collected</h2>\n    <h3>Personal Data</h3>\n    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>\n    <ul>\n    <li>\n    <p>Email address</p>\n    </li>\n    <li>\n    <p>First name and last name</p>\n    </li>\n    <li>\n    <p>Usage Data</p>\n    </li>\n    </ul>\n    <h3>Usage Data</h3>\n    <p>Usage Data is collected automatically when using the Service.</p>\n    <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>\n    <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>\n    <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>\n    <h3>Tracking Technologies and Cookies</h3>\n    <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.</p>\n    <p>You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.</p>\n    <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser. Learn more about cookies: <a href=\"https://www.termsfeed.com/blog/cookies/\" target=\"_blank\">All About Cookies</a>.</p>\n    <p>We use both session and persistent Cookies for the purposes set out below:</p>\n    <ul>\n    <li>\n    <p><strong>Necessary / Essential Cookies</strong></p>\n    <p>Type: Session Cookies</p>\n    <p>Administered by: Us</p>\n    <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>\n    </li>\n    <li>\n    <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>\n    <p>Type: Persistent Cookies</p>\n    <p>Administered by: Us</p>\n    <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>\n    </li>\n    <li>\n    <p><strong>Functionality Cookies</strong></p>\n    <p>Type: Persistent Cookies</p>\n    <p>Administered by: Us</p>\n    <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>\n    </li>\n    </ul>\n    <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>\n    <h2>Use of Your Personal Data</h2>\n    <p>The Company may use Personal Data for the following purposes:</p>\n    <ul>\n    <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>\n    <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>\n    <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>\n    <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>\n    <li><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>\n    <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>\n    </ul>\n    <p>We may share your personal information in the following situations:</p>\n    <ul>\n    <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>\n    <li><strong>For Business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.</li>\n    <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>\n    <li><strong>With Business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>\n    <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>\n    </ul>\n    <h2>Retention of Your Personal Data</h2>\n    <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>\n    <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>\n    <h2>Transfer of Your Personal Data</h2>\n    <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>\n    <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>\n    <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>\n    <h2>Disclosure of Your Personal Data</h2>\n    <h3>Business Transactions</h3>\n    <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>\n    <h3>Law enforcement</h3>\n    <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>\n    <h3>Other legal requirements</h3>\n    <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>\n    <ul>\n    <li>Comply with a legal obligation</li>\n    <li>Protect and defend the rights or property of the Company</li>\n    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>\n    <li>Protect the personal safety of Users of the Service or the public</li>\n    <li>Protect against legal liability</li>\n    </ul>\n    <h2>Security of Your Personal Data</h2>\n    <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>\n    <h1>Your California Privacy Rights (California's Shine the Light law)</h1>\n    <p>Under California Civil Code Section 1798 (California's Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties' direct marketing purposes.</p>\n    <p>If you'd like to request more information under the California Shine the Light law, and if you are a California resident, You can contact Us using the contact information provided below.</p>\n    <h1>California Privacy Rights for Minor Users (California Business and Professions Code Section 22581)</h1>\n    <p>California Business and Professions Code section 22581 allow California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.</p>\n    <p>To request removal of such data, and if you are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.</p>\n    <p>Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.</p>\n    <h1>Links to Other Websites</h1>\n    <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>\n    <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>\n    <h1>Changes to this Privacy Policy</h1>\n    <p>We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>\n    <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>\n    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>\n    <h1>Contact Us</h1>\n    <p>If you have any questions about this Privacy Policy, You can contact us:</p>\n    <ul>\n    <li>By email: contact@selectpolling.ca</li>\n    </ul>\n\n  </div>\n\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/profile/profile.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/profile/profile.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<nav *ngIf=\"user.classrooms_master.length > 0 || user.classrooms_student.length > 0\" aria-label=\"breadcrumb\" class=\"toolbar\">\n  <ol class=\"breadcrumb master\" style=\"margin-bottom:5px;\">\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_master of user.classrooms_master\">\n      <a routerLink=\"/classroom/{{classroom_master.name}}\"><i class=\"material-icons\" style=\"font-size:12px;\">vpn_key</i> {{ classroom_master.name }}</a>\n    </li>\n    <li class=\"breadcrumb-item\" *ngFor=\"let classroom_student of user.classrooms_student\">\n      <a routerLink=\"/classroom/{{classroom_student.name}}\">{{ classroom_student.name }}</a>\n    </li>\n  </ol>\n</nav>\n\n<!-- Button trigger modal -->\n<button #delete type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\" style=\"display:none;\">\n</button>\n\n<!-- Modal -->\n<div #modal class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h6 *ngIf=\"master; else studentTitle\" class=\"modal-title\" id=\"exampleModalLabel\">If you are certain about deleting <b style=\"color:red;\">'{{ deleteDetails.name }}'</b> please enter the classroom password: </h6>\n        <ng-template #studentTitle>\n          <h6 class=\"modal-title\" id=\"exampleModalLabel\">If you are certain about leaving <b style=\"color:red;\">'{{ deleteDetails.name }}'</b> please enter your password: </h6>\n        </ng-template>\n        <button #close type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form #authAction=\"ngForm\">\n          <div class=\"form-group\">\n            <label for=\"classpassword\">Password</label>\n            <input minlength=\"6\" maxlength=\"12\" required [(ngModel)]=\"password\" name=\"password\" type=\"password\" class=\"form-control\" id=\"classpassword\" placeholder=\"Password\">\n            <button *ngIf=\"master; else studentButton\" style=\"margin-top:10px;\" type=\"submit\" class=\"btn btn-primary\" (click)=\"removeMaster()\" [disabled]=\"!authAction.form.valid || isLoadingDelClass\">\n              <div *ngIf=\"isLoadingDelClass\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n                <span class=\"sr-only\">Loading...</span>\n              </div>\n              Submit\n            </button>\n            <ng-template #studentButton>\n              <button style=\"margin-top:10px;\" type=\"submit\" class=\"btn btn-primary\" (click)=\"removeStudent()\" [disabled]=\"!authAction.form.valid || isLoadingLeaveClass\">\n                <div *ngIf=\"isLoadingLeaveClass\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n                  <span class=\"sr-only\">Loading...</span>\n                </div>\n                Submit\n              </button>\n            </ng-template>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\" style=\"margin-top:15px;\">\n  <div class=\"col-lg-4 col-md-6 col-12\">\n    <div *ngIf=\"errorMsg.length > 0\">\n      <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n        {{ e.msg }}\n      </div>\n    </div>\n    <div *ngIf=\"success\" class=\"alert alert-info\" role=\"alert\">\n      Your password has been successfully changed.\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\" style=\"margin-bottom:20px;\">{{ user.firstname | titlecase }} {{ user.lastname | titlecase }}</h5>\n        <h6 class=\"card-subtitle\"><i class=\"material-icons\">verified_user</i><b> {{ user.username }}</b></h6>\n        <p class=\"card-text\"><i class=\"material-icons\">school</i> {{user.school}}<br>\n        <i class=\"material-icons\">email</i> <u>{{ user.email }}</u><br>\n        <span *ngIf=\"user.studentnumber\"><i class=\"material-icons\">grade</i>  {{ user.studentnumber }}</span></p>\n\n        <p style=\"margin:0px;\" *ngIf=\"user.status;else notstudent\">STUDENT</p>\n        <ng-template #notstudent>\n          <p style=\"margin:0px;\">NON STUDENT</p>\n        </ng-template>\n        <button style=\"margin-top:10px;\" type=\"button\" class=\"btn btn-outline-danger btn-block\" (click)=\"changeSettings('delete')\">Delete account</button>\n        <button type=\"button\" class=\"btn btn-outline-primary btn-block\" (click)=\"changeSettings('pwd')\">Change password</button>\n      </div>\n    </div>\n\n    <div style=\"margin-top:20px;\">\n      <h3>Classrooms</h3>\n      <div *ngIf=\"user.classrooms_master.length > 0\" style=\"margin-bottom:20px;\">\n        <h6>Admin</h6>\n        <div *ngFor=\"let classroom of user.classrooms_master;index as i\">\n          <span (click)=\"deleteClassMaster(i)\" class=\"material-icons trash\" style=\"vertical-align:middle;margin-right:10px;\">delete_outline</span>{{ classroom.name }}\n        </div>\n      </div>\n      <div *ngIf=\"user.classrooms_student.length > 0\" style=\"margin-bottom:25px;margin-top:20px;\">\n        <h6>Student</h6>\n        <div *ngFor=\"let classroom of user.classrooms_student;index as i\" style=\"margin-bottom:10px;\">\n          <span (click)=\"deleteClassStudent(i)\" class=\"material-icons trash\" style=\"vertical-align:middle;margin-right:10px;\">delete_outline</span>{{ classroom.name }}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"change\" class=\"col-lg-3 col-md-6 col-12\" style=\"margin-bottom:20px;\">\n    <form #changePassword=\"ngForm\" *ngIf=\"setting == 'pwd';else deleteAccount\" (ngSubmit)=\"changeMyPassword(changePasswordObj)\">\n      <div class=\"form-group\">\n        <label for=\"exampleInputPassword1\">Old password</label>\n        <input required [(ngModel)]=\"changePasswordObj.old\" minlength=\"4\" maxlength=\"12\" name=\"old\" type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Old\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"exampleInputPassword1\">New password</label>\n        <input required [(ngModel)]=\"changePasswordObj.new\" minlength=\"4\" maxlength=\"12\" name=\"new\" type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"New\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"exampleInputPassword1\">Confirm new password</label>\n        <input required [(ngModel)]=\"changePasswordObj.confirm\" minlength=\"4\" maxlength=\"12\" name=\"confirm\" type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Confirm\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary btn-block\" [disabled]=\"!changePassword.form.valid || isLoadingPass\">\n        <div *ngIf=\"isLoadingPass\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n          <span class=\"sr-only\">Loading...</span>\n        </div>\n        Change password\n      </button>\n    </form>\n    <ng-template #deleteAccount>\n      <form #delete=\"ngForm\" (ngSubmit)=\"deleteAcc(password)\">\n        <div class=\"form-group\">\n          <label for=\"exampleInputPassword1\">To delete your account, please enter your password.</label>\n          <input minlength=\"4\" maxlength=\"12\" required [(ngModel)]=\"password\" name=\"password\" type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-danger btn-block\" [disabled]=\"!delete.form.valid || isLoadingDel\">\n          <div *ngIf=\"isLoadingDel\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Delete account\n        </button>\n      </form>\n    </ng-template>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/register/register.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/register/register.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n      <a class=\"navbar-brand\" routerLink=\"/\"><h4 style=\"margin:0px;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select Polling</h4></a>\n      <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\">\n        <ul class=\"navbar-nav\">\n          <li class=\"nav-item active\">\n            <a class=\"nav-link\" routerLink=\"/login\">Login</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/manual\">FAQ</a>\n          </li>\n        </ul>\n      </div>\n    </nav>\n  </div>\n</div>\n\n<div class=\"row justify-content-center\" style=\"margin-bottom:60px;\">\n  <div class=\"col-12\">\n      <h2><i class=\"material-icons\">input</i> Register</h2>\n  </div>\n  <div class=\"col-10 col-lg-5\">\n    <div *ngIf=\"errorMsg.length > 0\">\n      <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n        {{ e.msg }}\n      </div>\n    </div>\n    <form (ngSubmit)=\"register(student)\" #studentRegistration=\"ngForm\">\n      <div class=\"form-group\">\n        <label for=\"username\" style=\"margin-bottom:0px;\">Username</label><br>\n        <small>Must be between 4-12 characters and contain only numbers and/or letters.</small>\n        <input required [(ngModel)]=\"student.username\" name=\"username\" class=\"form-control\"\n        minlength=\"4\" maxlength=\"12\" type=\"text\" id=\"username\" placeholder=\"Username\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\" style=\"margin-bottom:0px;\">Password</label><br>\n        <small>Must be between 4-12 characters and contain only numbers and/or letters.</small>\n        <input required [(ngModel)]=\"student.password\" name=\"password\" type=\"password\" class=\"form-control\"\n        minlength=\"4\" maxlength=\"12\" id=\"password\" placeholder=\"Password\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"cpassword\" style=\"margin-bottom:0px;\">Confirm password</label><br>\n        <input required [(ngModel)]=\"student.confirmPassword\" name=\"cpassword\" type=\"password\" class=\"form-control\"\n        minlength=\"4\" maxlength=\"12\" id=\"cpassword\" placeholder=\"Confirm password\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"first\">First name</label>\n        <input required [(ngModel)]=\"student.firstname\" name=\"first\" class=\"form-control\"\n        minlength=\"2\" maxlength=\"16\" type=\"text\" id=\"first\" placeholder=\"First name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"last\">Last name</label>\n        <input required [(ngModel)]=\"student.lastname\" name=\"last\" class=\"form-control\" type=\"text\" id=\"last\"\n        minlength=\"2\" maxlength=\"16\" placeholder=\"Last name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"school\">School</label>\n        <select required [(ngModel)]=\"student.school\" name=\"school\" class=\"form-control\" id=\"school\">\n          <option *ngFor=\"let school of allSchools\" [value]=\"school\">{{ school }}</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"schoolemail\">School email</label>\n        <input required [(ngModel)]=\"student.email\" name=\"email\" type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Enter email\">\n      </div>\n      <div class=\"form-group\">\n        <label>Are you a student at this institution?</label><br>\n        <div class=\"form-check form-check-inline\">\n          <input required [(ngModel)]=\"student.status\" class=\"form-check-input\" type=\"radio\" name=\"status\" id=\"student\" value=\"yes\">\n          <label class=\"form-check-label\" for=\"student\">Yes</label>\n        </div>\n        <div class=\"form-check form-check-inline\">\n          <input required [(ngModel)]=\"student.status\" class=\"form-check-input\" type=\"radio\" name=\"status\" id=\"notstudent\" value=\"no\">\n          <label class=\"form-check-label\" for=\"notstudent\">No</label>\n        </div>\n      </div>\n      <div class=\"form-group\" *ngIf=\"student.status == 'yes'\">\n        <label for=\"studentnumber\">Student number</label>\n        <input [(ngModel)]=\"student.studentnumber\" name=\"studentnumber\" class=\"form-control\" type=\"number\" id=\"studentnumber\" placeholder=\"ID\">\n      </div>\n      <div class=\"form-group\" *ngIf=\"student.status == 'yes'\">\n        <label for=\"electionKey\"><b style=\"color:red;\">Election key</b></label><br>\n        <small>Must be between 6-20 characters</small><br>\n        <small>You will need this key to access elections. <a routerLink=\"/manual\" target=\"_blank\" rel=\"noopener\">What is this?</a></small>\n        <input minlength=\"6\" maxlength=\"20\" [(ngModel)]=\"student.electionKey\"\n        name=\"electionKey\" class=\"form-control\" type=\"password\" id=\"electionKey\" placeholder=\"Key\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary register\" [disabled]=\"!studentRegistration.form.valid || isLoading\">\n        <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n          <span class=\"sr-only\">Loading...</span>\n        </div>\n         Sign up\n      </button>\n      <small>Already have an account? <a routerLink=\"/login\">Login!</a></small>\n    </form>\n  </div>\n\n</div>\n\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/reset/reset.component.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reset/reset.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\" style=\"margin-top:50px;\">\n  <div class=\"col-10 col-lg-4\">\n      <h2 style=\"text-align:center;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i><a routerLink=\"/login\" style=\"color:black;text-decoration:none;\">Select polling</a></h2>\n\n      <div *ngIf=\"errorMsg.length > 0\">\n        <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n          {{ e.msg }}\n        </div>\n      </div>\n\n      <div *ngIf=\"success\" class=\"alert alert-info\" role=\"alert\">\n        Your password has been successfully changed. <a routerLink=\"/login\">Login.</a>\n      </div>\n\n      <form (ngSubmit)=\"resetPassword()\" #reset=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label><br>\n          <small>Must be between 4-12 characters and contain only numbers and/or letters.</small>\n          <input required [(ngModel)]=\"user.password\" name=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"cpassword\">Confirm password</label><br>\n          <input required [(ngModel)]=\"user.cpassword\" name=\"cpassword\" type=\"password\" class=\"form-control\" id=\"cpassword\" placeholder=\"Password\">\n        </div>\n\n\n        <button style=\"width:100%;\" type=\"submit\" class=\"btn btn-primary login\" [disabled]=\"!reset.form.valid || isLoading\">\n          <div *ngIf=\"isLoading\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n            <span class=\"sr-only\">Loading...</span>\n          </div>\n          Reset\n        </button>\n      </form>\n\n\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;margin-right:5px;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/stv/stv.component.html":
/*!******************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/stv/stv.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo03\" aria-controls=\"navbarTogglerDemo03\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <h4 style=\"margin-right:25px;\"><a id=\"logo\" routerLink='/dashboard'><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select polling</a></h4>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo03\">\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/profile\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">account_circle</span> Profile</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link logout\" (click)=\"logout()\" style=\"font-size:15px;\"><span class=\"material-icons\" style=\"vertical-align:middle;\">exit_to_app</span> Logout</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/manual\" style=\"font-size:15px;\">FAQ</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<div class=\"row justify-content-center\" style=\"margin-top:25px;\">\n  <div class=\"col-lg-6 col-12\">\n    <div *ngIf=\"success\" class=\"alert alert-info\" role=\"alert\">\n      Thanks for placing your vote!\n    </div>\n\n    <div *ngIf=\"errorMsg.length > 0\">\n      <div *ngFor=\"let e of errorMsg\" class=\"alert alert-danger\" role=\"alert\">\n        {{ e.msg }}\n      </div>\n    </div>\n\n    <div *ngIf=\"election.type == 'stv' && election.status\">\n      <h3>{{ election.title }}</h3>\n      <span (click)=\"electionTypes()\"><span class=\"material-icons\" style=\"font-size:17px;vertical-align:middle\">help_outline</span> Election type: <b>{{ election.type | uppercase }}</b></span><br>\n      <span>Please rank the candidates from most preferred to least preferred by clicking on their name. Rankings will appear above the \"VOTE\" button. To delete a candidate that has been ranked, click their name on the ranked list.</span><br>\n      <span>To be elected: <b>{{ election.vacancies }}</b></span><br>\n      <span style=\"margin-right:5px;\" *ngFor=\"let url of election.links\">\n        <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n        <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n      </span>\n      <p>{{ election.description }}</p>\n      <span>Duration: {{ election.duration }} hour(s)</span><br>\n      <span style=\"color:red;margin-bottom:10px;\">Remaining:\n\n          <b>{{ countdownTime[0].time }}</b>\n\n      </span>\n\n\n      <div *ngFor=\"let candidate of election.candidates;index as idx\" style=\"margin-bottom:10px;\">\n        <span class=\"selectCandidate\" (click)=\"append(candidate.name,candidate._id)\"><b>[{{ countOb[candidate._id]}}]</b> {{ candidate.name | titlecase }} </span>\n        <div class=\"progress\" style=\"margin-top:10px;\">\n          <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\"studentWidths[candidate._id]\">\n          </div>\n        </div>\n      </div>\n      <span *ngIf=\"countdownTime[0].time != 'expired' && studentVoterStatus[user.studentnumber] === false\"><span class=\"material-icons\" style=\"vertical-align:middle;font-size:15px;color:gold;\">emoji_events</span> Ranking: <span class=\"selectCandidate\" *ngFor=\"let n of STV_votes_name;index as r\" (click)=\"delRank(r)\"><b> {{ r+1 }}. {{ n | titlecase }} </b></span></span><br>\n      <span *ngIf=\"countdownTime[0].time != 'expired' && studentVoterStatus[user.studentnumber] === false\"\n      class=\"badge badge-pill badge-success voteButton\" (click)=\"myVote(election._id,STV_votes_id,'stv')\" style=\"margin-right:5px;\">VOTE</span>\n\n    </div>\n\n\n\n    <div *ngIf=\"election.type == 'stv' && !election.status\">\n      <highcharts-chart\n         [Highcharts] = \"highcharts\"\n         [options] = \"chartInfo\"\n         style = \"width: 100%; height: 300px; display: block;\">\n      </highcharts-chart>\n      <div style=\"text-align:center\">\n        Created: {{ election.date | date:\"medium\" }}<br>\n        Duration: {{ election.duration }} hours<br>\n        <span *ngIf=\"election.type\">Type of election: <b>{{ election.type | uppercase }}</b></span><br>\n        <span>To be elected: <b>{{ election.vacancies }}</b><br>\n        <span>Total votes: <b>{{ election.total }}</b></span>\n        </span><br>\n        <span><b style=\"color:red;\">Winner(s):</b> <span *ngFor=\"let student of results\"> {{ student.name }} <i class=\"fas fa-check check\"></i></span></span>\n\n        <div>\n          <span *ngFor=\"let url of election.links\">\n            <span class=\"material-icons\" style=\"font-size:12px;margin-right:5px;\">link</span>\n            <a href=\"{{url}}\" target=\"_blank\" rel=\"noopener\">{{ url }}</a>\n          </span>\n        </div>\n      </div>\n      <div style=\"text-align:center\">{{ election.description }}</div>\n    </div>\n\n    <div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n      <div class=\"col-12\">\n        <footer style=\"text-align:center;font-size:12px\">\n          2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n          <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n          <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n        </footer>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/terms/terms.component.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/terms/terms.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <nav class=\"navbar navbar-light bg-light\">\n      <a class=\"navbar-brand\" routerLink=\"/\"><h4 style=\"margin:0px;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select Polling</h4></a>\n    </nav>\n  </div>\n</div>\n<div class=\"row\" style=\"margin-top:20px;\">\n  <div class=\"col-12\">\n    <h2>Terms and Conditions</h2>\n    <p>Last updated: May 28, 2020</p>\n    <p>Please read these terms and conditions carefully before using Our Service.</p>\n    <h1>Interpretation and Definitions</h1>\n    <h2>Interpretation</h2>\n    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>\n    <p>The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>\n    <h2>Definitions</h2>\n    <p>For the purposes of these Terms and Conditions:</p>\n    <ul>\n    <li>\n    <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>\n    </li>\n    <li>\n    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>\n    </li>\n    <li>\n    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Select Polling.</p>\n    </li>\n    <li>\n    <p><strong>Country</strong> refers to: Manitoba,  Canada</p>\n    </li>\n    <li>\n    <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>\n    </li>\n    <li>\n    <p><strong>Service</strong> refers to the Website.</p>\n    </li>\n    <li>\n    <p><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</p>\n    </li>\n    <li>\n    <p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>\n    </li>\n    <li>\n    <p><strong>Website</strong> refers to Select Polling, accessible from <a href=\"https://www.selectpolling.ca\" rel=\"external nofollow noopener\" target=\"_blank\">https://www.selectpolling.ca</a></p>\n    </li>\n    <li>\n    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>\n    </li>\n    </ul>\n    <h1>Acknowledgement</h1>\n    <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>\n    <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>\n    <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>\n    <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>\n    <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>\n    <h1>User Accounts</h1>\n    <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>\n    <p>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.</p>\n    <p>You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</p>\n    <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.</p>\n    <h1>Links to Other Websites</h1>\n    <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>\n    <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>\n    <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>\n    <h1>Termination</h1>\n    <p>We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>\n    <p>Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.</p>\n    <h1>Limitation of Liability</h1>\n    <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>\n    <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>\n    <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>\n    <h1>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h1>\n    <p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>\n    <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>\n    <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>\n    <h1>Governing Law</h1>\n    <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>\n    <h1>Disputes Resolution</h1>\n    <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>\n    <h1>For European Union (EU) Users</h1>\n    <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</p>\n    <h1>United States Legal Compliance</h1>\n    <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>\n    <h1>Severability and Waiver</h1>\n    <h2>Severability</h2>\n    <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>\n    <h2>Waiver</h2>\n    <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.</p>\n    <h1>Translation Interpretation</h1>\n    <p>These Terms and Conditions may have been translated if We have made them available to You on our Service.\n    You agree that the original English text shall prevail in the case of a dispute.</p>\n    <h1>Changes to These Terms and Conditions</h1>\n    <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>\n    <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>\n    <h1>Contact Us</h1>\n    <p>If you have any questions about these Terms and Conditions, You can contact us:</p>\n    <ul>\n    <li>By email: contact@selectpolling.ca</li>\n    </ul>\n\n  </div>\n\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:50px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/whatis/whatis.component.html":
/*!************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/whatis/whatis.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n      <a class=\"navbar-brand\" routerLink=\"/\"><h4 style=\"margin:0px;\"><i class=\"material-icons\" style=\"margin-right:10px;\">poll</i> Select Polling</h4></a>\n      <button style=\"border:none;\" class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\">\n        <ul class=\"navbar-nav\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/manual\">FAQ</a>\n          </li>\n        </ul>\n      </div>\n    </nav>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:20px;\">\n  <div class=\"col-10\">\n    <h5>First-past-the-post (FPP)</h5>\n    <p>Voters will vote for their favorite candidate (one vote per person). Once the poll has closed, the candidate with the majority of the votes closed will be elected. <br><br>\n<u>Note: under the FPP system</u>, a ‘majority win’ does not necessarily imply a candidate has received 50+ percent of the vote. Rather, for a candidate to be elected, they must have the popular vote.</p>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:20px;\">\n  <div class=\"col-10\">\n    <h5>Single transferrable voting (STV)</h5>\n    <p>STV allows for proportional representation by letting voters rank candidates on their ballot from most preferred, to least preferred.\n      This system avoids a common problem that emerges from only being able to vote for one candidate and often seen with FPP.\n      The “one-vote” requirement can force voters to vote strategically or run the risk of having an undesirable candidate elected.\n      For example, there are three candidates: A, B and C; and A/B are liberal candidates who have similar policies, and candidate C is a conservative candidate with\n      drastically different policies. If the voting system is FPP, and candidate C obtains 40% of the vote,\n      whereas A/B each achieve 30% of the vote, then C would be elected. Despite only having 40% of the vote, and 60% of voters not voting for C, candidate C would still be\n      considered the winner under the FPP system. Alternatively, the STV system circumvents this problem by allowing each voter to rank candidates on their ballot.\n      If the example above had been through a STV system, then 60% of the voters would have chosen A/B as their 1st or 2nd choices on their ballots;\n      resulting in either A/B becoming elected rather than C.\n      <br><br>\n      STV elections are suitable for singular or multiple vacancy elections. After all the votes have been submitted a quota (or threshold)\n      is calculated based on the number of votes and seats that are up for election. A candidate must surpass this quota to be elected.<br><br>\n      <b style=\"color:red;\">How are votes counted in STV?</b><br>\n  All candidates have their votes tallied. Candidates are given a vote if someone has chosen them first on their ballot.\n  If a candidate has exceeded the threshold, then they are elected. If the number of candidates exceeding the threshold is equal to the number of\n  seats to be elected, then the election is deemed complete. However, if there are still vacancies, then the elected candidates will get their surplus votes\n  redistributed to other candidates based on the 2nd preference listed on the surplus ballots. If the redistribution is enough to push a candidate over the\n  quota/threshold, then that individual is elected. If there empty seats are still available, then the candidate with the fewest votes is eliminated and\n  their votes are redistributed to remaining candidates based on the preferences indicated on the redistributed ballots.\n  This process will be repeated until all seats are fill - either by candidates exceeding the threshold or elimination of other candidates.<br><br>\n\n  Check out the link below if you would like additional information.\n</p>\n  </div>\n  <div class=\"col-8 col-lg-6\">\n    <div class=\"embed-responsive embed-responsive-16by9\">\n      <iframe class=\"embed-responsive-item\" src=\"https://www.youtube.com/embed/P38Y4VG1Ibo\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n    </div>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:20px;\">\n  <div class=\"col-10\">\n    <h5>Preferential (instant-runoff) voting</h5>\n    <p>This is an STV election, but with only one person to be elected. Under this system, a candidate will need approximately 50% of the vote to be elected. The mechanism by which votes are counted is identical as an STV\n      election with multiple seats to be elected.</p>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:20px;\">\n  <div class=\"col-10\">\n    <h5>Approval voting</h5>\n    <p>Under an approval voting system, each voter will select as many candidates that they support. The candidate with the most approvals is then elected. Similar to STV, it allows each voter to provide multiple inputs on a single ballot; thus, preventing some of the shortcomings seen under the FPP system.</p>\n  </div>\n</div>\n<div class=\"row justify-content-center\" style=\"margin-top:100px;margin-bottom:20px;\">\n  <div class=\"col-12\">\n    <footer style=\"text-align:center;font-size:12px\">\n      2020 &copy; Select Polling. All Rights Reserved.<br>Created in WPG, MB, CAN <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">favorite</span><br>\n      <span class=\"material-icons\" style=\"font-size:15px;vertical-align:middle;\">help</span>  contact@selectpolling.ca<br>\n      <a routerLink=\"/privacy\" style=\"color:black\">Privacy Policy</a> | <a routerLink=\"/terms\" style=\"color:black;\">Terms and Conditions</a>\n    </footer>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'select';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! highcharts-angular */ "./node_modules/highcharts-angular/fesm2015/highcharts-angular.js");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _bypass_guard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./bypass.guard */ "./src/app/bypass.guard.ts");
/* harmony import */ var _classcheck_guard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./classcheck.guard */ "./src/app/classcheck.guard.ts");
/* harmony import */ var _reset_guard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reset.guard */ "./src/app/reset.guard.ts");
/* harmony import */ var _vote_guard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./vote.guard */ "./src/app/vote.guard.ts");
/* harmony import */ var _create_create_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./create/create.component */ "./src/app/create/create.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _classroom_classroom_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./classroom/classroom.component */ "./src/app/classroom/classroom.component.ts");
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./search.pipe */ "./src/app/search.pipe.ts");
/* harmony import */ var _user_search_pipe__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./user-search.pipe */ "./src/app/user-search.pipe.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var _archive_pipe__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./archive.pipe */ "./src/app/archive.pipe.ts");
/* harmony import */ var _reset_reset_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./reset/reset.component */ "./src/app/reset/reset.component.ts");
/* harmony import */ var _manual_manual_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./manual/manual.component */ "./src/app/manual/manual.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./privacy/privacy.component */ "./src/app/privacy/privacy.component.ts");
/* harmony import */ var _terms_terms_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./terms/terms.component */ "./src/app/terms/terms.component.ts");
/* harmony import */ var _whatis_whatis_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./whatis/whatis.component */ "./src/app/whatis/whatis.component.ts");
/* harmony import */ var _fpp_fpp_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./fpp/fpp.component */ "./src/app/fpp/fpp.component.ts");
/* harmony import */ var _stv_stv_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./stv/stv.component */ "./src/app/stv/stv.component.ts");
/* harmony import */ var _approval_approval_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./approval/approval.component */ "./src/app/approval/approval.component.ts");

































const appRoutes = [
    { path: "manual", component: _manual_manual_component__WEBPACK_IMPORTED_MODULE_25__["ManualComponent"] },
    { path: "", component: _home_home_component__WEBPACK_IMPORTED_MODULE_26__["HomeComponent"] },
    { path: "privacy", component: _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_27__["PrivacyComponent"] },
    { path: "terms", component: _terms_terms_component__WEBPACK_IMPORTED_MODULE_28__["TermsComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"], canActivate: [_bypass_guard__WEBPACK_IMPORTED_MODULE_13__["BypassGuard"]] },
    { path: "register", component: _register_register_component__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"], canActivate: [_bypass_guard__WEBPACK_IMPORTED_MODULE_13__["BypassGuard"]] },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__["DashboardComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_12__["AuthGuard"]] },
    { path: 'create', component: _create_create_component__WEBPACK_IMPORTED_MODULE_17__["CreateComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_12__["AuthGuard"]] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_18__["ProfileComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_12__["AuthGuard"]] },
    { path: 'classroom/:id', component: _classroom_classroom_component__WEBPACK_IMPORTED_MODULE_19__["ClassroomComponent"], canActivate: [_classcheck_guard__WEBPACK_IMPORTED_MODULE_14__["ClasscheckGuard"]] },
    { path: 'reset', component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_22__["ForgotPasswordComponent"], canActivate: [_bypass_guard__WEBPACK_IMPORTED_MODULE_13__["BypassGuard"]] },
    { path: 'change-pwd/:username/:hash', component: _reset_reset_component__WEBPACK_IMPORTED_MODULE_24__["ResetComponent"], canActivate: [_reset_guard__WEBPACK_IMPORTED_MODULE_15__["ResetGuard"]] },
    { path: "election/fpp/:id", component: _fpp_fpp_component__WEBPACK_IMPORTED_MODULE_30__["FppComponent"], canActivate: [_vote_guard__WEBPACK_IMPORTED_MODULE_16__["VoteGuard"]] },
    { path: "election/stv/:id", component: _stv_stv_component__WEBPACK_IMPORTED_MODULE_31__["StvComponent"], canActivate: [_vote_guard__WEBPACK_IMPORTED_MODULE_16__["VoteGuard"]] },
    { path: "election/approval/:id", component: _approval_approval_component__WEBPACK_IMPORTED_MODULE_32__["ApprovalComponent"], canActivate: [_vote_guard__WEBPACK_IMPORTED_MODULE_16__["VoteGuard"]] },
    { path: "whatis", component: _whatis_whatis_component__WEBPACK_IMPORTED_MODULE_29__["WhatisComponent"] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
            _register_register_component__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"],
            _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_11__["DashboardComponent"],
            _create_create_component__WEBPACK_IMPORTED_MODULE_17__["CreateComponent"],
            _profile_profile_component__WEBPACK_IMPORTED_MODULE_18__["ProfileComponent"],
            _classroom_classroom_component__WEBPACK_IMPORTED_MODULE_19__["ClassroomComponent"],
            _search_pipe__WEBPACK_IMPORTED_MODULE_20__["SearchPipe"],
            _user_search_pipe__WEBPACK_IMPORTED_MODULE_21__["UserSearchPipe"],
            _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_22__["ForgotPasswordComponent"],
            _archive_pipe__WEBPACK_IMPORTED_MODULE_23__["ArchivePipe"],
            _reset_reset_component__WEBPACK_IMPORTED_MODULE_24__["ResetComponent"],
            _manual_manual_component__WEBPACK_IMPORTED_MODULE_25__["ManualComponent"],
            _home_home_component__WEBPACK_IMPORTED_MODULE_26__["HomeComponent"],
            _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_27__["PrivacyComponent"],
            _terms_terms_component__WEBPACK_IMPORTED_MODULE_28__["TermsComponent"],
            _whatis_whatis_component__WEBPACK_IMPORTED_MODULE_29__["WhatisComponent"],
            _fpp_fpp_component__WEBPACK_IMPORTED_MODULE_30__["FppComponent"],
            _stv_stv_component__WEBPACK_IMPORTED_MODULE_31__["StvComponent"],
            _approval_approval_component__WEBPACK_IMPORTED_MODULE_32__["ApprovalComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"].forRoot(appRoutes),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            highcharts_angular__WEBPACK_IMPORTED_MODULE_5__["HighchartsChartModule"],
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__["RecaptchaV3Module"]
        ],
        providers: [_auth_guard__WEBPACK_IMPORTED_MODULE_12__["AuthGuard"], { provide: ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__["RECAPTCHA_V3_SITE_KEY"], useValue: '6Ld-1PsUAAAAAAMg_aTSUoaBqNbUnbpo4FPWdYcE' }],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/approval/approval.component.css":
/*!*************************************************!*\
  !*** ./src/app/approval/approval.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".voteButton:hover {\n  cursor:pointer;\n  color:red;\n}\n\n.progress-bar {\n  transition: all 0.5s;\n}\n\n#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n.logout:hover {\n  cursor: pointer;\n}\n\n.check {\n  color: green;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwcm92YWwvYXBwcm92YWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7RUFDZCxTQUFTO0FBQ1g7O0FBRUE7RUFFRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0FBQ2QiLCJmaWxlIjoic3JjL2FwcC9hcHByb3ZhbC9hcHByb3ZhbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZvdGVCdXR0b246aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbiAgY29sb3I6cmVkO1xufVxuXG4ucHJvZ3Jlc3MtYmFyIHtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC41cztcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG59XG5cbiNsb2dvIHtcbiAgY29sb3I6YmxhY2s7XG59XG5cbiNsb2dvOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuLmxvZ291dDpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNoZWNrIHtcbiAgY29sb3I6IGdyZWVuO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/approval/approval.component.ts":
/*!************************************************!*\
  !*** ./src/app/approval/approval.component.ts ***!
  \************************************************/
/*! exports provided: ApprovalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApprovalComponent", function() { return ApprovalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_6__);







let ApprovalComponent = class ApprovalComponent {
    constructor(router, useract, signin) {
        this.router = router;
        this.useract = useract;
        this.signin = signin;
        this.approvalOb = {};
        this.errorMsg = [];
        this.highcharts = highcharts__WEBPACK_IMPORTED_MODULE_6__;
    }
    ngOnInit() {
        this.user = this.signin.student;
        this.election = this.useract.election;
        if (this.election.status) {
            document.querySelector('title').innerHTML = "Select Polling | Vote";
            if (this.election.type == "approval") {
                // approval
                this.initializeCountDown(this.election);
                let x = (60 - new Date().getSeconds()) * 1000;
                this.timeOut = setTimeout(() => {
                    this.initializeCountDown(this.election);
                    this.interval = setInterval(() => {
                        this.initializeCountDown(this.election);
                    }, 60000);
                }, x);
                this.progressUpdate(this.election, this.election.type, false);
            }
            else if (this.election.type == "stv") {
                this.router.navigate([`/election/stv/${this.election._id}`]);
            }
            else if (this.election.type == "fpp") {
                this.router.navigate([`/election/fpp/${this.election._id}`]);
            }
            this.socket_votes = socket_io_client__WEBPACK_IMPORTED_MODULE_5__("https://www.selectpolling.ca/update");
            this.socket_votes.on("updatedCount", (ob) => {
                this.progressUpdate(ob.updatedElection, "approval", true);
            });
            // join classroom
            this.socket_votes.emit("joinElectionRoom", this.election._id);
        }
        else {
            // archived
            document.querySelector('title').innerHTML = "Select Polling | Results";
            let data = [];
            this.election.candidates.forEach((candidate) => {
                this.election.count.forEach((vote, i) => {
                    if (vote._id == candidate._id) {
                        if (vote.votes) {
                            if (i == 0) {
                                data.push({ name: `${candidate.name}`, y: vote.votes, sliced: true, selected: true });
                            }
                            else {
                                data.push({ name: `${candidate.name}`, y: vote.votes });
                            }
                        }
                        else {
                            data.push({ name: `${candidate.name}`, y: 0 });
                        }
                    }
                });
            });
            let dis_data = data.map((ob) => {
                let co = this.election.total / this.election.candidates.length;
                let disapproval = co - ob.y;
                return { name: ob.name, y: disapproval };
            });
            this.chartInfo_app = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: `${this.election.title} (approval)`
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        name: 'Approval Votes',
                        colorByPoint: true,
                        data: data
                    }]
            };
            this.chartInfo_dis = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: `${this.election.title} (disapproval)`
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        name: 'Disapproval Votes',
                        colorByPoint: true,
                        data: dis_data
                    }]
            };
        }
    }
    ngOnDestroy() {
        clearTimeout(this.timeOut);
        clearInterval(this.interval);
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.expiredElec)
            this.expiredElec.unsubscribe();
        if (this.voteSub)
            this.voteSub.unsubscribe();
    }
    logout() {
        this.logoutSub = this.signin.logout().subscribe((data) => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    initializeCountDown(e) {
        let timeObject = [];
        const start = new Date(e.date).getTime();
        const duration = e.duration * 3600000;
        const expiration = start + duration;
        let current = new Date().getTime();
        if (current < expiration) {
            const delta_s = (current - start) / 3600000;
            const delta_d = e.duration - delta_s;
            const re1 = new RegExp("\\d+");
            const hours = delta_d.toString().match(re1)[0];
            const min = Math.round((delta_d - Math.floor(delta_d)) * 60).toString();
            if (min.length <= 1) {
                if (parseInt(min) == 0 && parseInt(hours) == 0) {
                    timeObject.push({ "time": "expired", "id": e._id });
                }
                else {
                    timeObject.push({ "time": `${hours}h:0${min}m` });
                }
            }
            else {
                timeObject.push({ "time": `${hours}h:${min}m` });
            }
        }
        else {
            timeObject.push({ "time": "expired", "id": e._id });
        }
        this.countdownTime = timeObject;
        if (this.countdownTime[0].time == "expired") {
            this.expiredElec = this.useract.expired([this.countdownTime[0].id]).subscribe(() => {
            }, (err) => {
            });
        }
    }
    progressUpdate(activeElection, option, socketInput) {
        // [[{},{}],[{},{}]]
        if (option == "approval") {
            let width = {};
            let count = {};
            activeElection.count.forEach((countObject) => {
                if (countObject.votes) {
                    count[countObject._id] = countObject.votes;
                    let pct = (countObject.votes * 100) / this.useract.classSize;
                    width[countObject._id] = `${pct}%`;
                }
                else {
                    count[countObject._id] = 0;
                    width[countObject._id] = `0%`;
                }
            });
            if (socketInput) {
            }
            else {
                let allStudents = {};
                activeElection.voteStatus.forEach((studentObject) => {
                    if (studentObject.didVote) {
                        allStudents[studentObject.studentnumber] = true;
                    }
                    else {
                        allStudents[studentObject.studentnumber] = false;
                    }
                });
                this.studentVoterStatus = allStudents;
            }
            this.countOb = count;
            this.studentWidths = width;
        }
    }
    myVote(id, approvalOb, option) {
        this.voteSub = this.useract.vote(id, approvalOb, option).subscribe((data) => {
            this.studentVoterStatus[this.user.studentnumber] = true;
            this.errorMsg = [];
            this.success = true;
            this.socket_votes.emit("check", this.election._id);
        }, (err) => {
            this.errorMsg = err.error.errors;
        });
    }
    electionTypes() {
        this.router.navigate(['/whatis']);
    }
};
ApprovalComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] },
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] }
];
ApprovalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-approval',
        template: __webpack_require__(/*! raw-loader!./approval.component.html */ "./node_modules/raw-loader/index.js!./src/app/approval/approval.component.html"),
        styles: [__webpack_require__(/*! ./approval.component.css */ "./src/app/approval/approval.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"], _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"]])
], ApprovalComponent);



/***/ }),

/***/ "./src/app/archive.pipe.ts":
/*!*********************************!*\
  !*** ./src/app/archive.pipe.ts ***!
  \*********************************/
/*! exports provided: ArchivePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArchivePipe", function() { return ArchivePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ArchivePipe = class ArchivePipe {
    transform(previousElections, search) {
        if (search.trim().length > 0) {
            const filtered = previousElections.filter((election) => {
                return election.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            return filtered;
        }
        else {
            return previousElections;
        }
    }
};
ArchivePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'archive'
    })
], ArchivePipe);



/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signin.service */ "./src/app/signin.service.ts");




let AuthGuard = class AuthGuard {
    constructor(signin, router) {
        this.signin = signin;
        this.router = router;
    }
    canActivate() {
        let p = new Promise((resolve, reject) => {
            this.loggedSub = this.signin.loggedIn().subscribe((data) => {
                this.signin.student = data.student;
                resolve();
            }, (err) => {
                reject();
            });
        });
        return p.then(() => {
            this.loggedSub.unsubscribe();
            return true;
        }, () => {
            this.loggedSub.unsubscribe();
            this.router.navigate(['/login']);
            return false;
        });
    }
};
AuthGuard.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], AuthGuard);



/***/ }),

/***/ "./src/app/bypass.guard.ts":
/*!*********************************!*\
  !*** ./src/app/bypass.guard.ts ***!
  \*********************************/
/*! exports provided: BypassGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BypassGuard", function() { return BypassGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signin.service */ "./src/app/signin.service.ts");




let BypassGuard = class BypassGuard {
    constructor(signin, router) {
        this.signin = signin;
        this.router = router;
    }
    canActivate() {
        let p = new Promise((resolve, reject) => {
            this.loggedInSub = this.signin.loggedIn().subscribe((data) => {
                this.signin.student = data.student;
                resolve();
            }, (err) => {
                reject();
            });
        });
        return p.then(() => {
            this.loggedInSub.unsubscribe();
            this.router.navigate(['/dashboard']);
            return false;
        }, () => {
            this.loggedInSub.unsubscribe();
            return true;
        });
    }
};
BypassGuard.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
BypassGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], BypassGuard);



/***/ }),

/***/ "./src/app/classcheck.guard.ts":
/*!*************************************!*\
  !*** ./src/app/classcheck.guard.ts ***!
  \*************************************/
/*! exports provided: ClasscheckGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClasscheckGuard", function() { return ClasscheckGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-action.service */ "./src/app/user-action.service.ts");





let ClasscheckGuard = class ClasscheckGuard {
    constructor(signin, router, useract) {
        this.signin = signin;
        this.router = router;
        this.useract = useract;
    }
    canActivate(route) {
        let p = new Promise((resolve, reject) => {
            this.loggedSub = this.signin.loggedIn().subscribe((data) => {
                this.signin.student = data.student;
                resolve();
            }, (err) => {
                reject(err);
            });
        });
        return p.then(() => {
            return new Promise((resolve, reject) => {
                this.classCheckSub = this.useract.statusCheck(route.params.id).subscribe((response) => {
                    this.useract.status = response.master;
                    this.useract.currentUrl = route.params.id;
                    resolve();
                }, (err) => {
                    this.useract.blockedAccess = true;
                    reject(err);
                });
            });
        }).then(() => {
            this.classCheckSub.unsubscribe();
            this.loggedSub.unsubscribe();
            return true;
        }).catch((error) => {
            // not logged in
            if (error.status == 422) {
                this.classCheckSub.unsubscribe();
                this.loggedSub.unsubscribe();
                this.router.navigate(['/dashboard']);
                return false;
            }
            else {
                this.loggedSub.unsubscribe();
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
};
ClasscheckGuard.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] }
];
ClasscheckGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"]])
], ClasscheckGuard);



/***/ }),

/***/ "./src/app/classroom/classroom.component.css":
/*!***************************************************!*\
  !*** ./src/app/classroom/classroom.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h4 a {\n  color:black;\n}\n\nh4 a:hover {\n  text-decoration:none;\n  cursor:pointer;\n}\n\n.toolbar ol {\n  background-color: white !important;\n}\n\ntd i {\n  font-size:20px;\n}\n\ntd i:hover {\n  cursor:pointer;\n}\n\nthead th {\n  border-bottom:none;\n}\n\n.cancelElection:hover {\n  cursor:pointer;\n}\n\n.logout:hover {\n  cursor:pointer;\n}\n\n.master {\n  padding-bottom:0px;\n  margin-bottom:0px;\n}\n\n.voteButton:hover {\n  cursor:pointer;\n  color:red;\n}\n\n.deleteElection:hover {\n  cursor:pointer;\n}\n\n.progress-bar {\n  transition: all 0.5s;\n}\n\n.removeResource {\n  font-size:12px;\n  margin-left:10px;\n}\n\n.removeResource:hover {\n  cursor:pointer;\n}\n\n.adv:hover {\n  cursor:pointer;\n  font-weight:bold;\n}\n\n.s {\n  font-weight:bold;\n}\n\n.selection small:hover {\n  cursor:pointer;\n}\n\n.stv_elecs span:hover {\n  cursor:pointer;\n}\n\n.electionBox a:hover {\n  text-decoration: none;\n}\n\n.elecTypes:hover {\n  cursor:pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2xhc3Nyb29tL2NsYXNzcm9vbS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBRUUsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY2xhc3Nyb29tL2NsYXNzcm9vbS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDQgYSB7XG4gIGNvbG9yOmJsYWNrO1xufVxuXG5oNCBhOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOm5vbmU7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG4udG9vbGJhciBvbCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbnRkIGkge1xuICBmb250LXNpemU6MjBweDtcbn1cblxudGQgaTpob3ZlciB7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG50aGVhZCB0aCB7XG4gIGJvcmRlci1ib3R0b206bm9uZTtcbn1cblxuLmNhbmNlbEVsZWN0aW9uOmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG5cbi5sb2dvdXQ6aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuLm1hc3RlciB7XG4gIHBhZGRpbmctYm90dG9tOjBweDtcbiAgbWFyZ2luLWJvdHRvbTowcHg7XG59XG5cbi52b3RlQnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG4gIGNvbG9yOnJlZDtcbn1cblxuLmRlbGV0ZUVsZWN0aW9uOmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG5cbi5wcm9ncmVzcy1iYXIge1xuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzO1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbn1cblxuLnJlbW92ZVJlc291cmNlIHtcbiAgZm9udC1zaXplOjEycHg7XG4gIG1hcmdpbi1sZWZ0OjEwcHg7XG59XG5cbi5yZW1vdmVSZXNvdXJjZTpob3ZlciB7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG4uYWR2OmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OmJvbGQ7XG59XG5cbi5zIHtcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcbn1cblxuLnNlbGVjdGlvbiBzbWFsbDpob3ZlciB7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG4uc3R2X2VsZWNzIHNwYW46aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuLmVsZWN0aW9uQm94IGE6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5lbGVjVHlwZXM6aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/classroom/classroom.component.ts":
/*!**************************************************!*\
  !*** ./src/app/classroom/classroom.component.ts ***!
  \**************************************************/
/*! exports provided: ClassroomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassroomComponent", function() { return ClassroomComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");






let ClassroomComponent = class ClassroomComponent {
    constructor(route, router, signin, useract) {
        this.route = route;
        this.router = router;
        this.signin = signin;
        this.useract = useract;
        this.user = {};
        this.classroom = {};
        this.tableHeadings = [];
        this.info = "";
        this.election = {};
        this.candidates = {};
        this.errorMsg = [];
        this.electionSheet = [];
        this.allElections = [];
        this.success = false;
        this.countdownTimes = [];
        this.editStudent = {};
        this.electionToDelete = {};
        this.history = [];
        this.add = false;
        this.addedStudentMsg = "";
        this.removedStudentMsg = "";
        this.resource = "";
        this.allResources = [];
        this.exitResource = false;
        this.waitOnInit = false;
        this.deletePollPassword = "";
        this.search = {};
        this.archiveSearch = "";
        this.urlsAll = [];
        this.selectCan = true;
        this.restrictCan = {};
        this.isLoading = false;
        this.isLoadingDelPoll = false;
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
        this.routerSub = this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                this.router.navigated = false;
            }
        });
    }
    ngOnInit() {
        this.pageLoad(this.useract.currentUrl);
    }
    ngOnDestroy() {
        clearTimeout(this.timeOut);
        clearInterval(this.interval);
        this.routerSub.unsubscribe();
        if (this.addStudentSub)
            this.addStudentSub.unsubscribe();
        if (this.deleteStudentSub)
            this.deleteStudentSub.unsubscribe();
        if (this.ticketSub)
            this.ticketSub.unsubscribe();
        if (this.pollSub)
            this.pollSub.unsubscribe();
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.expiredElec)
            this.expiredElec.unsubscribe();
        if (this.accessKeySub)
            this.accessKeySub.unsubscribe();
        if (this.accessCodeSub)
            this.accessCodeSub.unsubscribe();
        if (this.deletePollSub)
            this.deletePollSub.unsubscribe();
    }
    // logout
    logout() {
        this.logoutSub = this.signin.logout().subscribe((data) => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    // initialize
    pageLoad(param) {
        document.querySelector('title').innerHTML = `Select Polling | ${param}`;
        this.user = this.signin.student;
        this.election.typeof = "fpp";
        this.election.vacancies = 1;
        if (this.useract.status) {
            // admin
            this.status = true;
            this.signin.student.classrooms_master.forEach((classroom) => {
                if (classroom.name == param) {
                    // checking for permission to vote
                    if (classroom.elections) {
                        this.allElections = classroom.elections.filter(e => e.status == true);
                    }
                    else {
                        this.allElections = [];
                    }
                    this.classroom = classroom;
                    if (this.allElections.length > 0) {
                        // admin/master and not partaking
                        if (!classroom.partake) {
                            this.vote = true;
                            this.electionPermission = true;
                        }
                        else {
                            this.vote = true;
                            this.allElections.forEach((election) => {
                                let access = election.electionAccess.find(student => student.studentnumber == this.user.studentnumber && student.permission);
                                if (access) {
                                    this.electionPermission = true;
                                }
                                else {
                                    this.electionPermission = false;
                                }
                            });
                        }
                    }
                    let headings = Object.keys(this.classroom.students[0]);
                    headings.splice(headings.indexOf('_id'), 1);
                    headings.splice(headings.indexOf('studentnumber'), 1, 'student #');
                    this.tableHeadings = headings;
                    this.waitOnInit = true; // this is to make sure that the page initializes and is set up
                }
            });
        }
        else {
            // student
            this.status = false;
            this.signin.student.classrooms_student.forEach((classroom) => {
                if (classroom.name == param) {
                    // checking for permission to vote
                    if (classroom.elections) {
                        this.allElections = classroom.elections.filter(e => e.status == true);
                    }
                    else {
                        this.allElections = [];
                    }
                    this.classroom = classroom;
                    if (this.allElections.length > 0) {
                        this.vote = true;
                        this.allElections.forEach((election) => {
                            let access = election.electionAccess.find(student => student.studentnumber == this.signin.student.studentnumber && student.permission);
                            if (access) {
                                this.electionPermission = true;
                            }
                            else {
                                this.electionPermission = false;
                            }
                        });
                    }
                    const headings = Object.keys(this.classroom.students[0]);
                    headings.splice(headings.indexOf('_id'), 1);
                    this.tableHeadings = headings;
                    this.waitOnInit = true;
                }
            });
        }
        // archive
        //let chartOptions;
        if (this.classroom.elections) {
            this.history = this.classroom.elections.filter(e => e.status == false);
        }
        else {
            this.history = [];
        }
        if (this.allElections.length > 0) {
            this.initializeCountDowns();
            let x = (60 - new Date().getSeconds()) * 1000;
            this.timeOut = setTimeout(() => {
                this.initializeCountDowns();
                this.interval = setInterval(() => {
                    this.initializeCountDowns();
                }, 60000);
            }, x);
        }
    }
    initializeCountDowns() {
        let expiredIds = [];
        if (this.allElections.length > 0) {
            let timeObject = [];
            this.allElections.forEach((e) => {
                const start = new Date(e.date).getTime();
                const duration = e.duration * 3600000;
                const expiration = start + duration;
                let current = new Date().getTime();
                if (current < expiration) {
                    const delta_s = (current - start) / 3600000;
                    const delta_d = e.duration - delta_s;
                    const re1 = new RegExp("\\d+");
                    const hours = delta_d.toString().match(re1)[0];
                    const min = Math.round((delta_d - Math.floor(delta_d)) * 60).toString();
                    if (min.length <= 1) {
                        if (parseInt(min) == 0 && parseInt(hours) == 0) {
                            timeObject.push({ "time": "expired", "id": e._id });
                        }
                        else {
                            timeObject.push({ "time": `${hours}h:0${min}m` });
                        }
                    }
                    else {
                        timeObject.push({ "time": `${hours}h:${min}m` });
                    }
                }
                else {
                    timeObject.push({ "time": "expired", "id": e._id });
                }
            });
            this.countdownTimes = timeObject;
            let expired = this.countdownTimes.filter((time) => {
                if (time.time == "expired") {
                    return true;
                }
            });
            expired.forEach(time => expiredIds.push(time.id));
            if (expiredIds.length > 0) {
                this.expiredElec = this.useract.expired(expiredIds).subscribe(() => {
                }, (err) => {
                });
            }
        }
    }
    // accessing poll and voting
    access(password) {
        if (!this.eKey) {
            this.accessKeySub = this.useract.accessPollKey(password, this.classroom.name).subscribe((data) => {
                this.errorMsg = [];
                this.password = data.key;
                this.eKey = true;
            }, (err) => {
                this.errorMsg = err.error.errors;
            });
        }
        else {
            this.accessCodeSub = this.useract.accessPollCode(password, this.classroom.name).subscribe((data) => {
                window.location.reload();
            }, (err) => {
                this.errorMsg = err.error.errors;
            });
        }
    }
    // creating elections
    addResource() {
        this.allResources.push(this.resource);
        this.resource = "";
    }
    deleteLink(i) {
        this.allResources.splice(i, 1);
    }
    addToElectionSheet() {
        this.isLoading = true;
        this.election.candidates = this.candidates;
        this.election.restrictions = this.restrictCan;
        this.election.urls = this.allResources;
        this.ticketSub = this.useract.addToElectionSheet(this.election).subscribe((data) => {
            this.isLoading = false;
            this.election = {};
            this.election.typeof = "fpp";
            this.election.vacancies = 1;
            this.candidates = {};
            this.restrictCan = {};
            this.allResources = [];
            this.ticket = true;
            this.errorMsg = [];
            this.electionSheet.push(data['election']);
        }, (err) => {
            this.isLoading = false;
            this.errorMsg = err.error.errors;
        });
    }
    delete(i) {
        if (this.electionSheet.length == 1) {
            this.studentList.nativeElement.click();
            this.ticket = false;
            this.electionSheet.splice(i, 1);
        }
        else {
            this.electionSheet.splice(i, 1);
        }
    }
    poll(sheet, room) {
        this.isLoading = true;
        this.pollSub = this.useract.submitTicket(sheet, room).subscribe((data) => {
            window.location.reload();
        }, (err) => {
            this.isLoading = false;
            this.errorMsg = err.error.errors;
        });
    }
    settingOptions(option) {
        if (option == 'can') {
            this.selectCan = true;
        }
        if (option == 'res') {
            this.selectCan = false;
        }
    }
    // toggling side bar
    eraseShared() {
        setTimeout(() => {
            this.add = false;
            this.editStudent = {};
            this.errorMsg = [];
            this.removedStudentMsg = '';
            this.addedStudentMsg = '';
            this.success = false;
        }, 200);
    }
    // student list mods
    deleteStudent(student) {
        this.deleteStudentSub = this.useract.deleteStudent(student, this.classroom.name).subscribe((data) => {
            this.search.value = "";
            this.errorMsg = [];
            if (data.joined) {
                this.classroom.joined--;
            }
            this.classroom.students.splice(this.classroom.students.indexOf(student), 1);
            this.removedStudentMsg = `'${data.removedStudent.name}' has been removed from the class.`;
            this.addedStudentMsg = '';
        }, (err) => {
            this.addedStudentMsg = '';
            this.removedStudentMsg = '';
            this.errorMsg = err.error.errors;
        });
    }
    addStudent() {
        this.add = !this.add ? true : false;
    }
    addNow(student) {
        this.isLoading = true;
        this.addStudentSub = this.useract.addStudentToClass(student, this.classroom.name).subscribe((data) => {
            this.isLoading = false;
            this.search.value = "";
            this.errorMsg = [];
            this.classroom.students.push(data.addedStudent);
            this.removedStudentMsg = '';
            this.addedStudentMsg = `${data.addedStudent.name} has been successfully added to the classroom.`;
            this.add = false;
            this.editStudent = {};
        }, (err) => {
            this.isLoading = false;
            this.addedStudentMsg = '';
            this.removedStudentMsg = '';
            this.errorMsg = err.error.errors;
        });
    }
    // polls
    deleteElectionModal(i) {
        this.electionToDelete = this.allElections[i];
        this.cancelElec.nativeElement.click();
    }
    deletePoll() {
        this.isLoadingDelPoll = true;
        this.deletePollSub = this.useract.deletePoll(this.electionToDelete._id, this.classroom.name, this.deletePollPassword).subscribe((data) => {
            window.location.reload();
        }, (err) => {
            this.isLoadingDelPoll = false;
            this.close.nativeElement.click();
            this.errorMsg = err.error.errors;
        });
    }
    ;
    electionTypes() {
        this.router.navigate(['/whatis']);
    }
};
ClassroomComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('students', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ClassroomComponent.prototype, "studentList", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('deleteElecModal', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ClassroomComponent.prototype, "cancelElec", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('close', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ClassroomComponent.prototype, "close", void 0);
ClassroomComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-classroom',
        template: __webpack_require__(/*! raw-loader!./classroom.component.html */ "./node_modules/raw-loader/index.js!./src/app/classroom/classroom.component.html"),
        styles: [__webpack_require__(/*! ./classroom.component.css */ "./src/app/classroom/classroom.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"]])
], ClassroomComponent);



/***/ }),

/***/ "./src/app/create/create.component.css":
/*!*********************************************!*\
  !*** ./src/app/create/create.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "i:hover {\n  cursor:pointer;\n}\n\nthead th {\n  border-bottom:none;\n}\n\ni {\n  font-size:20px;\n}\n\n#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.logout:hover {\n  cursor:pointer;\n}\n\n.toolbar ol {\n  background-color: white !important;\n}\n\n.master {\n  padding-bottom:0px;\n  margin-bottom:0px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaTpob3ZlciB7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG50aGVhZCB0aCB7XG4gIGJvcmRlci1ib3R0b206bm9uZTtcbn1cblxuaSB7XG4gIGZvbnQtc2l6ZToyMHB4O1xufVxuXG4jbG9nbyB7XG4gIGNvbG9yOmJsYWNrO1xufVxuXG4jbG9nbzpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubG9nb3V0OmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG5cbi50b29sYmFyIG9sIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLm1hc3RlciB7XG4gIHBhZGRpbmctYm90dG9tOjBweDtcbiAgbWFyZ2luLWJvdHRvbTowcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/create/create.component.ts":
/*!********************************************!*\
  !*** ./src/app/create/create.component.ts ***!
  \********************************************/
/*! exports provided: CreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateComponent", function() { return CreateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");






let CreateComponent = class CreateComponent {
    constructor(signin, router, useract) {
        this.signin = signin;
        this.router = router;
        this.useract = useract;
        this.filename = "";
        this.classInformation = {};
        this.processed = false;
        this.students = [];
        this.tableHeadings = [];
        this.errorMsg = [];
        this.schools = ['University of Manitoba'];
        this.search = {};
        this.student = {};
        this.isLoading = false;
    }
    ngOnInit() {
        document.querySelector('title').innerHTML = "Select Polling | Create Classrom!";
        this.student = this.signin.student;
        this.classInformation.school = this.signin.student.school;
        this.partakeInPolls = this.signin.student.status;
        if (this.partakeInPolls) {
            this.classInformation.partake = "true";
        }
        else {
            this.classInformation.partake = "false";
        }
        this.search.value = "";
        this.search.searchBy = "name";
    }
    ngOnDestroy() {
        if (this.createSub)
            this.createSub.unsubscribe();
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.submitSub)
            this.submitSub.unsubscribe();
    }
    browse() {
        this.classList.nativeElement.click();
    }
    classInput(files) {
        this.filename = files[0].name;
        this.submitSub = this.useract.submitClass(files).subscribe((data) => {
            this.errorMsg = [];
            this.students = data["classlist"];
            let headings = Object.keys(data["classlist"][0]);
            headings.splice(headings.indexOf("studentnumber"), 1, "student #");
            headings.splice(headings.indexOf("email"), 1, "E-mail");
            this.tableHeadings = headings;
            this.processed = true;
        }, (err) => {
            this.errorMsg = err.error.errors;
        });
    }
    logout() {
        this.logoutSub = this.signin.logout().subscribe((data) => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    deleteRow(student) {
        this.search.value = "";
        this.students.splice(this.students.indexOf(student), 1);
    }
    createClass() {
        this.search.value = "";
        this.isLoading = true;
        this.createSub = this.useract.create(this.students, this.classInformation).subscribe((data) => {
            this.router.navigate(['/dashboard']);
        }, (err) => {
            this.isLoading = false;
            this.errorMsg = err.error.errors;
        });
    }
};
CreateComponent.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_2__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('fileInput', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], CreateComponent.prototype, "classList", void 0);
CreateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create',
        template: __webpack_require__(/*! raw-loader!./create.component.html */ "./node_modules/raw-loader/index.js!./src/app/create/create.component.html"),
        styles: [__webpack_require__(/*! ./create.component.css */ "./src/app/create/create.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_2__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"]])
], CreateComponent);



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n.toolbar ol {\n  background-color: white !important;\n}\n\n.logout:hover {\n  cursor:pointer;\n}\n\n.master {\n  padding-bottom:0px;\n  margin-bottom:0px;\n}\n\n.classname {\nfont-weight:700;\n}\n\n.classname:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2xvZ28ge1xuICBjb2xvcjpibGFjaztcbn1cblxuI2xvZ286aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG4udG9vbGJhciBvbCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5sb2dvdXQ6aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuLm1hc3RlciB7XG4gIHBhZGRpbmctYm90dG9tOjBweDtcbiAgbWFyZ2luLWJvdHRvbTowcHg7XG59XG5cbi5jbGFzc25hbWUge1xuZm9udC13ZWlnaHQ6NzAwO1xufVxuXG4uY2xhc3NuYW1lOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");






let DashboardComponent = class DashboardComponent {
    constructor(signin, router, useract) {
        this.signin = signin;
        this.router = router;
        this.useract = useract;
        this.student = {};
        this.query = "";
        this.displaySearchQuery = "";
        this.classes = [];
        this.modalTitle = "";
        this.paginationObject = {};
        this.pages = [];
        this.password = "";
        this.errorMsg = [];
        this.isLoading = false;
        this.isLoadingPass = false;
    }
    ngOnInit() {
        document.querySelector('title').innerHTML = "Select Polling | Dashboard";
        this.student = this.signin.student;
        this.restricted = this.useract.blockedAccess;
    }
    ngOnDestroy() {
        this.useract.blockedAccess = false;
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.searchSub)
            this.searchSub.unsubscribe();
        if (this.passwordSub)
            this.passwordSub.unsubscribe();
    }
    logout() {
        this.logoutSub = this.signin.logout().subscribe(() => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    find(query) {
        this.isLoading = true;
        this.searchSub = this.useract.searchClassrooms(query).subscribe((data) => {
            this.isLoading = false;
            this.displaySearchQuery = query;
            this.errorMsg = [];
            this.paginationObject = {};
            if (data.classes.length > 0) {
                const pagesExact = data.classes.length / 10; //9.7
                const re = new RegExp("\\d+");
                const totalPagesMinusOne = pagesExact.toString().match(re)[0];
                if (parseInt(totalPagesMinusOne) > 0) {
                    let classrooms = data.classes;
                    const pages = [...Array(parseInt(totalPagesMinusOne)).keys()].map(page => page + 1);
                    pages.forEach((page) => {
                        let classes = classrooms.splice(0, 10);
                        this.paginationObject[page] = classes;
                        if (page == Math.max(...pages) && classrooms.length > 0) {
                            this.paginationObject[page + 1] = classrooms;
                        }
                    });
                }
                else {
                    this.paginationObject[1] = data.classes;
                }
                this.pages = Object.keys(this.paginationObject);
                this.currentPage(1);
            }
            else {
                this.classes = [];
                this.pages = [];
            }
        }, (err) => {
            //
            this.isLoading = false;
            this.errorMsg = err.error.errors;
        });
    }
    currentPage(pg) {
        this.classes = this.paginationObject[pg];
    }
    open(name) {
        this.modalTitle = name;
        this.trigger.nativeElement.click();
    }
    locked(name) {
        if (this.student.classrooms_master.map(room => room.name).indexOf(name) > -1) {
            return false;
        }
        else {
            if (this.student.classrooms_student.map(room => room.name).indexOf(name) > -1) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    classPassword(pwd) {
        this.isLoadingPass = true;
        this.passwordSub = this.useract.unlockClass(pwd, this.modalTitle).subscribe(() => {
            this.exit.nativeElement.click();
            this.router.navigate([`/classroom/${this.modalTitle}`]);
        }, (err) => {
            this.isLoadingPass = false;
            this.exit.nativeElement.click();
            this.password = "";
            this.errorMsg = err.error.errors;
        });
    }
};
DashboardComponent.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_2__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('triggerModal', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], DashboardComponent.prototype, "trigger", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('exit', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], DashboardComponent.prototype, "exit", void 0);
DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/dashboard/dashboard.component.html"),
        styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_2__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"]])
], DashboardComponent);



/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.css":
/*!***************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.component.ts ***!
  \**************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");





let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(useract, recaptcha, titleService, metaService) {
        this.useract = useract;
        this.recaptcha = recaptcha;
        this.titleService = titleService;
        this.metaService = metaService;
        this.errorMsg = [];
        this.user = {};
        this.success = false;
        this.isLoading = false;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | Forgot Password');
        this.metaService.updateTag({ name: 'description', content: 'Please enter your email to reset your password. Further instructrions will be provided via email.' });
        this.metaService.updateTag({ name: 'keywords', content: 'password reset, forgot password' });
    }
    ngOnDestroy() {
        if (this.forgotSub)
            this.forgotSub.unsubscribe();
    }
    reset(user) {
        this.isLoading = true;
        this.recaptcha.execute('importantAction').subscribe((token) => {
            user.token = token;
            this.forgotSub = this.useract.forgotPassword(user).subscribe(() => {
                this.isLoading = false;
                this.errorMsg = [];
                this.success = true;
            }, (err) => {
                this.isLoading = false;
                this.success = false;
                this.errorMsg = err.error.errors;
            });
        });
    }
};
ForgotPasswordComponent.ctorParameters = () => [
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_2__["UserActionService"] },
    { type: ng_recaptcha__WEBPACK_IMPORTED_MODULE_3__["ReCaptchaV3Service"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Meta"] }
];
ForgotPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-forgot-password',
        template: __webpack_require__(/*! raw-loader!./forgot-password.component.html */ "./node_modules/raw-loader/index.js!./src/app/forgot-password/forgot-password.component.html"),
        styles: [__webpack_require__(/*! ./forgot-password.component.css */ "./src/app/forgot-password/forgot-password.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_user_action_service__WEBPACK_IMPORTED_MODULE_2__["UserActionService"], ng_recaptcha__WEBPACK_IMPORTED_MODULE_3__["ReCaptchaV3Service"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Meta"]])
], ForgotPasswordComponent);



/***/ }),

/***/ "./src/app/fpp/fpp.component.css":
/*!***************************************!*\
  !*** ./src/app/fpp/fpp.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".voteButton:hover {\n  cursor:pointer;\n  color:red;\n}\n\n.progress-bar {\n  transition: all 0.5s;\n}\n\n#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n.logout:hover {\n  cursor: pointer;\n}\n\n.check {\n  color: green;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZnBwL2ZwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztFQUNkLFNBQVM7QUFDWDs7QUFFQTtFQUVFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJzcmMvYXBwL2ZwcC9mcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi52b3RlQnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG4gIGNvbG9yOnJlZDtcbn1cblxuLnByb2dyZXNzLWJhciB7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXM7XG4gIHRyYW5zaXRpb246IGFsbCAwLjVzO1xufVxuXG4jbG9nbyB7XG4gIGNvbG9yOmJsYWNrO1xufVxuXG4jbG9nbzpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG5cbi5sb2dvdXQ6aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jaGVjayB7XG4gIGNvbG9yOiBncmVlbjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/fpp/fpp.component.ts":
/*!**************************************!*\
  !*** ./src/app/fpp/fpp.component.ts ***!
  \**************************************/
/*! exports provided: FppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FppComponent", function() { return FppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");







let FppComponent = class FppComponent {
    constructor(useract, signin, router) {
        this.useract = useract;
        this.signin = signin;
        this.router = router;
        this.election = {};
        this.user = {};
        this.errorMsg = [];
        this.highcharts = highcharts__WEBPACK_IMPORTED_MODULE_5__;
    }
    ngOnInit() {
        this.user = this.signin.student;
        this.election = this.useract.election;
        if (this.election.status) {
            document.querySelector('title').innerHTML = "Select Polling | Vote";
            if (this.election.type == "fpp") {
                // fpp
                this.initializeCountDown(this.election);
                let x = (60 - new Date().getSeconds()) * 1000;
                this.timeOut = setTimeout(() => {
                    this.initializeCountDown(this.election);
                    this.interval = setInterval(() => {
                        this.initializeCountDown(this.election);
                    }, 60000);
                }, x);
                this.progressUpdate(this.election, this.election.type, false);
            }
            else if (this.election.type == "stv") {
                this.router.navigate([`/election/stv/${this.election._id}`]);
            }
            else if (this.election.type == "approval") {
                this.router.navigate([`/election/approval/${this.election._id}`]);
            }
            this.socket_votes = socket_io_client__WEBPACK_IMPORTED_MODULE_4__("https://www.selectpolling.ca/update");
            this.socket_votes.on("updatedCount", (ob) => {
                this.progressUpdate(ob.updatedElection, "fpp", true);
            });
            // join classroom
            this.socket_votes.emit("joinElectionRoom", this.election._id);
        }
        else {
            // archived
            document.querySelector('title').innerHTML = "Select Polling | Results";
            let data = [];
            this.election.candidates.forEach((candidate) => {
                this.election.count.forEach((vote, i) => {
                    if (vote._id == candidate._id) {
                        if (vote.votes) {
                            if (i == 0) {
                                data.push({ name: `${candidate.name}`, y: vote.votes, sliced: true, selected: true });
                            }
                            else {
                                data.push({ name: `${candidate.name}`, y: vote.votes });
                            }
                        }
                        else {
                            data.push({ name: `${candidate.name}`, y: 0 });
                        }
                    }
                });
            });
            this.chartInfo = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: this.election.title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        name: 'Votes',
                        colorByPoint: true,
                        data: data
                    }]
            };
        }
    }
    logout() {
        this.logoutSub = this.signin.logout().subscribe((data) => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    ngOnDestroy() {
        clearTimeout(this.timeOut);
        clearInterval(this.interval);
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.expiredElec)
            this.expiredElec.unsubscribe();
        if (this.voteSub)
            this.voteSub.unsubscribe();
    }
    initializeCountDown(e) {
        let timeObject = [];
        const start = new Date(e.date).getTime();
        const duration = e.duration * 3600000;
        const expiration = start + duration;
        let current = new Date().getTime();
        if (current < expiration) {
            const delta_s = (current - start) / 3600000;
            const delta_d = e.duration - delta_s;
            const re1 = new RegExp("\\d+");
            const hours = delta_d.toString().match(re1)[0];
            const min = Math.round((delta_d - Math.floor(delta_d)) * 60).toString();
            if (min.length <= 1) {
                if (parseInt(min) == 0 && parseInt(hours) == 0) {
                    timeObject.push({ "time": "expired", "id": e._id });
                }
                else {
                    timeObject.push({ "time": `${hours}h:0${min}m` });
                }
            }
            else {
                timeObject.push({ "time": `${hours}h:${min}m` });
            }
        }
        else {
            timeObject.push({ "time": "expired", "id": e._id });
        }
        this.countdownTime = timeObject;
        if (this.countdownTime[0].time == "expired") {
            this.expiredElec = this.useract.expired([this.countdownTime[0].id]).subscribe(() => {
            }, (err) => {
            });
        }
    }
    progressUpdate(activeElection, option, socketInput) {
        // [[{},{}],[{},{}]]
        if (option == "fpp") {
            let width = {};
            let count = {};
            activeElection.count.forEach((countObject) => {
                if (countObject.votes) {
                    count[countObject._id] = countObject.votes;
                    let pct = (countObject.votes * 100) / this.useract.classSize;
                    width[countObject._id] = `${pct}%`;
                }
                else {
                    count[countObject._id] = 0;
                    width[countObject._id] = `0%`;
                }
            });
            if (socketInput) {
            }
            else {
                let allStudents = {};
                activeElection.voteStatus.forEach((studentObject) => {
                    if (studentObject.didVote) {
                        allStudents[studentObject.studentnumber] = true;
                    }
                    else {
                        allStudents[studentObject.studentnumber] = false;
                    }
                });
                this.studentVoterStatus = allStudents;
            }
            this.countOb = count;
            this.studentWidths = width;
        }
    }
    myVote(id, student, option) {
        this.voteSub = this.useract.vote(id, student, option).subscribe((data) => {
            this.studentVoterStatus[this.user.studentnumber] = true;
            this.errorMsg = [];
            this.success = true;
            this.socket_votes.emit("check", this.election._id);
        }, (err) => {
            this.errorMsg = err.error.errors;
        });
    }
    electionTypes() {
        this.router.navigate(['/whatis']);
    }
};
FppComponent.ctorParameters = () => [
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_2__["UserActionService"] },
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
FppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fpp',
        template: __webpack_require__(/*! raw-loader!./fpp.component.html */ "./node_modules/raw-loader/index.js!./src/app/fpp/fpp.component.html"),
        styles: [__webpack_require__(/*! ./fpp.component.css */ "./src/app/fpp/fpp.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_user_action_service__WEBPACK_IMPORTED_MODULE_2__["UserActionService"], _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
], FppComponent);



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".progress-bar {\n  transition: all 0.5s;\n}\n\n.features {\n  list-style: none;\n  padding: 0;\n}\n\n.features li {\n  padding-left: 1.3em;\n}\n\n.features li:before {\n  content: \"\\f00c\";\n  font-family: FontAwesome;\n  color:green;\n  display: inline-block;\n  margin-left: -1.3em;\n  width: 1.3em;\n}\n\n.elec-type:hover {\n  cursor:pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtBQUNaOztBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHdCQUF3QjtFQUN4QixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZ3Jlc3MtYmFyIHtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC41cztcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG59XG5cbi5mZWF0dXJlcyB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG4uZmVhdHVyZXMgbGkge1xuICBwYWRkaW5nLWxlZnQ6IDEuM2VtO1xufVxuLmZlYXR1cmVzIGxpOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMDBjXCI7XG4gIGZvbnQtZmFtaWx5OiBGb250QXdlc29tZTtcbiAgY29sb3I6Z3JlZW47XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luLWxlZnQ6IC0xLjNlbTtcbiAgd2lkdGg6IDEuM2VtO1xufVxuXG4uZWxlYy10eXBlOmhvdmVyIHtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");





let HomeComponent = class HomeComponent {
    constructor(router, metaService, titleService) {
        this.router = router;
        this.metaService = metaService;
        this.titleService = titleService;
        this.john = '14%';
        this.highcharts = highcharts__WEBPACK_IMPORTED_MODULE_3__;
        this.jane = '10%';
        this.timeLeft = 22;
        this.janeCount = 10;
        this.johnCount = 14;
        this.chartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Senior Stick Election 🔥'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Votes',
                    colorByPoint: true,
                    data: [{ name: 'Tim Elias', y: 7, sliced: true, selected: true }, { name: 'Lucas Kyle', y: 3 }, { name: 'Johnny Apple', y: 4 }]
                }]
        };
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling');
        this.metaService.updateTag({ name: 'description', content: 'A place to run your student council elections securely.' });
        this.metaService.updateTag({ name: 'keywords', content: 'Elections,voting,university,student council' });
        this.johnInterval = setInterval(() => {
            const re = new RegExp("\\d+");
            let votePCT = parseInt(this.john.match(re)[0]);
            if (votePCT > 50) {
                this.john = "14%";
                this.johnCount = 14;
            }
            else {
                let newVote = votePCT + 2;
                this.john = newVote + "%";
                this.johnCount = this.johnCount + 2;
            }
        }, 10000);
        this.janeInterval = setInterval(() => {
            const re = new RegExp("\\d+");
            let votePCT = parseInt(this.john.match(re)[0]);
            if (votePCT > 50) {
                this.jane = "10%";
                this.janeCount = 10;
            }
            else {
                let newVote = votePCT + 2;
                this.jane = newVote + "%";
                this.janeCount = this.janeCount + 2;
            }
        }, 15000);
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                clearInterval(this.janeInterval);
                clearInterval(this.johnInterval);
                clearTimeout(this.timer);
                this.timeLeft = "expired";
            }
        }, 60000);
    }
    ngOnDestroy() {
        clearInterval(this.janeInterval);
        clearInterval(this.johnInterval);
        clearTimeout(this.timer);
    }
    login() {
        this.router.navigate(['/login']);
    }
    register() {
        this.router.navigate(['/register']);
    }
    electionTypes() {
        this.router.navigate(['/whatis']);
    }
};
HomeComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Meta"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Title"] }
];
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.component.html"),
        styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Meta"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["Title"]])
], HomeComponent);



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login {\n  width: 100%;\n}\n\nh2 {\n  margin-top:20px;\n  margin-bottom:20px;\n}\n\nsmall {\n  margin-top:15px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbiB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5oMiB7XG4gIG1hcmdpbi10b3A6MjBweDtcbiAgbWFyZ2luLWJvdHRvbToyMHB4O1xufVxuXG5zbWFsbCB7XG4gIG1hcmdpbi10b3A6MTVweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _signup_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../signup.service */ "./src/app/signup.service.ts");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");








let LoginComponent = class LoginComponent {
    constructor(signup, signin, router, useract, recaptcha, titleService, metaService) {
        this.signup = signup;
        this.signin = signin;
        this.router = router;
        this.useract = useract;
        this.recaptcha = recaptcha;
        this.titleService = titleService;
        this.metaService = metaService;
        this.msg = "";
        this.student = {};
        this.errorMsg = [];
        this.isLoading = false;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | Login');
        this.metaService.updateTag({ name: 'description', content: 'Please login to your account. If you do not have one, register now!' });
        if (this.signup.msg != "") {
            this.msg = this.signup.msg;
        }
    }
    ngOnDestroy() {
        this.signup.msg = "";
        if (this.loginSub) {
            this.loginSub.unsubscribe();
        }
        this.useract.blockedAccess = false;
    }
    login(student) {
        this.isLoading = true;
        this.recaptcha.execute('importantAction').subscribe((token) => {
            student.token = token;
            this.loginSub = this.signin.login(student).subscribe(() => {
                this.router.navigate(['/dashboard']);
            }, (err) => {
                this.isLoading = false;
                this.msg = "";
                this.signup.msg = "";
                this.errorMsg = [];
                if (err.status != 423) {
                    this.errorMsg = err.error.errors;
                }
                else {
                    this.msg = err.error;
                }
            });
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _signup_service__WEBPACK_IMPORTED_MODULE_2__["SignupService"] },
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_5__["UserActionService"] },
    { type: ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__["ReCaptchaV3Service"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Meta"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/index.js!./src/app/login/login.component.html"),
        styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signup_service__WEBPACK_IMPORTED_MODULE_2__["SignupService"], _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_5__["UserActionService"],
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__["ReCaptchaV3Service"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Meta"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/manual/manual.component.css":
/*!*********************************************!*\
  !*** ./src/app/manual/manual.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h5 {\n  margin-top:10px;\n}\n\n.questions a {\n  text-decoration: underline;\n  font-weight:bold;\n}\n\na:hover {\n  cursor:pointer;\n}\n\n#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFudWFsL21hbnVhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9tYW51YWwvbWFudWFsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoNSB7XG4gIG1hcmdpbi10b3A6MTBweDtcbn1cblxuLnF1ZXN0aW9ucyBhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIGZvbnQtd2VpZ2h0OmJvbGQ7XG59XG5cbmE6aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuI2xvZ28ge1xuICBjb2xvcjpibGFjaztcbn1cblxuI2xvZ286aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/manual/manual.component.ts":
/*!********************************************!*\
  !*** ./src/app/manual/manual.component.ts ***!
  \********************************************/
/*! exports provided: ManualComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualComponent", function() { return ManualComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let ManualComponent = class ManualComponent {
    constructor(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | FAQ');
        this.metaService.updateTag({ name: 'description', content: 'Some of the more FAQ\'s that we receive. If your question is still not answered contact us at contact@selectpolling.ca' });
    }
    scrollTo(id) {
        document.getElementById(id).scrollIntoView();
    }
};
ManualComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"] }
];
ManualComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-manual',
        template: __webpack_require__(/*! raw-loader!./manual.component.html */ "./node_modules/raw-loader/index.js!./src/app/manual/manual.component.html"),
        styles: [__webpack_require__(/*! ./manual.component.css */ "./src/app/manual/manual.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"]])
], ManualComponent);



/***/ }),

/***/ "./src/app/privacy/privacy.component.css":
/*!***********************************************!*\
  !*** ./src/app/privacy/privacy.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ByaXZhY3kvcHJpdmFjeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/privacy/privacy.component.ts":
/*!**********************************************!*\
  !*** ./src/app/privacy/privacy.component.ts ***!
  \**********************************************/
/*! exports provided: PrivacyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyComponent", function() { return PrivacyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let PrivacyComponent = class PrivacyComponent {
    constructor(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | Privacy');
        this.metaService.updateTag({ name: 'description', content: 'For further questions about our privacy policy, please contact contact@selectpolling.ca.' });
        this.metaService.updateTag({ name: 'keywords', content: 'privacy' });
    }
};
PrivacyComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"] }
];
PrivacyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-privacy',
        template: __webpack_require__(/*! raw-loader!./privacy.component.html */ "./node_modules/raw-loader/index.js!./src/app/privacy/privacy.component.html"),
        styles: [__webpack_require__(/*! ./privacy.component.css */ "./src/app/privacy/privacy.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"]])
], PrivacyComponent);



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/*!***********************************************!*\
  !*** ./src/app/profile/profile.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\nul {\n  list-style: none;\n}\n\n.card i {\n  font-size:15px;\n  margin-right:10px;\n}\n\n.card button {\n  letter-spacing:1px;\n  padding-left:20px;\n  font-size:15px;\n}\n\n.card-header {\n  padding:0px;\n}\n\n.logout:hover {\n  cursor: pointer;\n}\n\n.toolbar ol {\n  background-color: white !important;\n}\n\n.trash:hover {\n  color:red;\n  cursor:pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsU0FBUztFQUNULGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNsb2dvIHtcbiAgY29sb3I6YmxhY2s7XG59XG5cbiNsb2dvOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxudWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4uY2FyZCBpIHtcbiAgZm9udC1zaXplOjE1cHg7XG4gIG1hcmdpbi1yaWdodDoxMHB4O1xufVxuXG4uY2FyZCBidXR0b24ge1xuICBsZXR0ZXItc3BhY2luZzoxcHg7XG4gIHBhZGRpbmctbGVmdDoyMHB4O1xuICBmb250LXNpemU6MTVweDtcbn1cblxuLmNhcmQtaGVhZGVyIHtcbiAgcGFkZGluZzowcHg7XG59XG5cbi5sb2dvdXQ6aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi50b29sYmFyIG9sIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLnRyYXNoOmhvdmVyIHtcbiAgY29sb3I6cmVkO1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");






let ProfileComponent = class ProfileComponent {
    constructor(signin, router, useract) {
        this.signin = signin;
        this.router = router;
        this.useract = useract;
        this.user = {};
        this.deleteDetails = {};
        this.password = "";
        this.errorMsg = [];
        this.change = false;
        this.changePasswordObj = {};
        this.success = false;
        this.setting = "";
        this.isLoadingPass = false;
        this.isLoadingDel = false;
        this.isLoadingLeaveClass = false;
        this.isLoadingDelClass = false;
    }
    ngOnInit() {
        this.user = this.signin.student;
        document.querySelector('title').innerHTML = `Select Polling | ${this.user.firstname}`;
    }
    ngOnDestroy() {
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.deleteClassSub)
            this.deleteClassSub.unsubscribe();
        if (this.leaveClassSub)
            this.leaveClassSub.unsubscribe();
        if (this.changePasswordSub)
            this.changePasswordSub.unsubscribe();
        if (this.deleteAccSub)
            this.deleteAccSub.unsubscribe();
    }
    logout() {
        this.logoutSub = this.signin.logout().subscribe((data) => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    deleteClassMaster(i) {
        this.password = "";
        this.master = true;
        this.deleteDetails = this.user.classrooms_master[i];
        this.deleteDetails.index = i;
        this.trash.nativeElement.click();
    }
    deleteClassStudent(i) {
        this.password = "";
        this.master = false;
        this.deleteDetails = this.user.classrooms_student[i];
        this.deleteDetails.index = i;
        this.trash.nativeElement.click();
    }
    removeMaster() {
        this.isLoadingDelClass = true;
        this.deleteClassSub = this.useract.deleteClass(this.password, this.deleteDetails.name).subscribe((data) => {
            this.back.nativeElement.click();
            window.location.reload();
        }, (err) => {
            this.isLoadingDelClass = false;
            this.success = false;
            this.back.nativeElement.click();
            this.password = "";
            this.errorMsg = err.error.errors;
        });
    }
    removeStudent() {
        this.isLoadingLeaveClass = true;
        this.leaveClassSub = this.useract.leaveClass(this.password, this.deleteDetails.name).subscribe((data) => {
            this.back.nativeElement.click();
            window.location.reload();
        }, (err) => {
            this.isLoadingLeaveClass = false;
            this.success = false;
            this.back.nativeElement.click();
            this.password = "";
            this.errorMsg = err.error.errors;
        });
    }
    changeSettings(setting) {
        this.setting = setting;
        this.change = true;
    }
    changeMyPassword(pwdObject) {
        this.isLoadingPass = true;
        this.changePasswordSub = this.useract.pwd(pwdObject).subscribe(() => {
            this.isLoadingPass = false;
            this.errorMsg = [];
            this.success = true;
            this.change = false;
            this.changePasswordObj = {};
        }, (err) => {
            this.isLoadingPass = false;
            this.success = false;
            this.errorMsg = err.error.errors;
        });
    }
    deleteAcc(pwd) {
        this.isLoadingDel = true;
        this.deleteAccSub = this.useract.deleteMyAcc(pwd).subscribe(() => {
            window.location.reload();
        }, (err) => {
            this.isLoadingDel = false;
            this.password = "";
            this.success = false;
            this.errorMsg = err.error.errors;
        });
    }
};
ProfileComponent.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_2__["SigninService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('delete', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ProfileComponent.prototype, "trash", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('close', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ProfileComponent.prototype, "back", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('modal', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ProfileComponent.prototype, "modal", void 0);
ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(/*! raw-loader!./profile.component.html */ "./node_modules/raw-loader/index.js!./src/app/profile/profile.component.html"),
        styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/profile/profile.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_2__["SigninService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"]])
], ProfileComponent);



/***/ }),

/***/ "./src/app/register/register.component.css":
/*!*************************************************!*\
  !*** ./src/app/register/register.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".register {\n  width:100%;\n  margin-top:20px;\n  margin-bottom: 20px;\n}\n\nh2 {\n  margin-top:20px;\n  text-align:center;\n}\n\na:hover {\n  text-decoration: none;\n}\n\n.errorOutput {\n  margin-top:20px;\n}\n\n#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDVixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVnaXN0ZXIge1xuICB3aWR0aDoxMDAlO1xuICBtYXJnaW4tdG9wOjIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbmgyIHtcbiAgbWFyZ2luLXRvcDoyMHB4O1xuICB0ZXh0LWFsaWduOmNlbnRlcjtcbn1cblxuYTpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLmVycm9yT3V0cHV0IHtcbiAgbWFyZ2luLXRvcDoyMHB4O1xufVxuXG4jbG9nbyB7XG4gIGNvbG9yOmJsYWNrO1xufVxuXG4jbG9nbzpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _signup_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../signup.service */ "./src/app/signup.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");






let RegisterComponent = class RegisterComponent {
    constructor(signup, router, recaptcha, titleService, metaService) {
        this.signup = signup;
        this.router = router;
        this.recaptcha = recaptcha;
        this.titleService = titleService;
        this.metaService = metaService;
        this.student = {};
        this.errorMsg = [];
        this.allSchools = ['University of Manitoba'];
        this.isLoading = false;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | Register');
        this.metaService.updateTag({ name: 'description', content: 'A place to run your student council elections securely.' });
        this.student.status = "yes";
        this.student.school = "University of Manitoba";
    }
    ngOnDestroy() {
        if (this.regSub) {
            this.regSub.unsubscribe();
        }
    }
    register(student) {
        this.isLoading = true;
        this.recaptcha.execute('importantAction').subscribe((token) => {
            student.token = token;
            this.regSub = this.signup.register(student).subscribe((data) => {
                this.signup.msg = data.msg;
                this.router.navigate(['/login']);
            }, (err) => {
                this.isLoading = false;
                this.errorMsg = err.error.errors;
            });
        });
    }
};
RegisterComponent.ctorParameters = () => [
    { type: _signup_service__WEBPACK_IMPORTED_MODULE_2__["SignupService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: ng_recaptcha__WEBPACK_IMPORTED_MODULE_4__["ReCaptchaV3Service"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Meta"] }
];
RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(/*! raw-loader!./register.component.html */ "./node_modules/raw-loader/index.js!./src/app/register/register.component.html"),
        styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signup_service__WEBPACK_IMPORTED_MODULE_2__["SignupService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], ng_recaptcha__WEBPACK_IMPORTED_MODULE_4__["ReCaptchaV3Service"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Meta"]])
], RegisterComponent);



/***/ }),

/***/ "./src/app/reset.guard.ts":
/*!********************************!*\
  !*** ./src/app/reset.guard.ts ***!
  \********************************/
/*! exports provided: ResetGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetGuard", function() { return ResetGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signin.service */ "./src/app/signin.service.ts");





let ResetGuard = class ResetGuard {
    constructor(router, useract, signin) {
        this.router = router;
        this.useract = useract;
        this.signin = signin;
    }
    canActivate(route) {
        let p = new Promise((resolve, reject) => {
            this.loggedInSub = this.signin.loggedIn().subscribe((data) => {
                this.signin.student = data.student;
                reject(new Error('Logged in.'));
            }, (err) => {
                resolve();
            });
        });
        return p.then(() => {
            return new Promise((resolve, reject) => {
                this.accessFPwdView = this.useract.accessForgotPasswordView(route.params.username, route.params.hash).subscribe((response) => {
                    this.useract.username = response.username;
                    this.useract.fpassword = response.forgotPassword;
                    resolve();
                }, (error) => {
                    reject(error);
                });
            });
        }).then(() => {
            this.accessFPwdView.unsubscribe();
            this.loggedInSub.unsubscribe();
            return true;
        }).catch((error) => {
            if (!error.status) {
                this.loggedInSub.unsubscribe();
                this.router.navigate(['/dashboard']);
                return false;
            }
            else {
                this.loggedInSub.unsubscribe();
                this.accessFPwdView.unsubscribe();
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
};
ResetGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_3__["UserActionService"] },
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_4__["SigninService"] }
];
ResetGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_3__["UserActionService"], _signin_service__WEBPACK_IMPORTED_MODULE_4__["SigninService"]])
], ResetGuard);



/***/ }),

/***/ "./src/app/reset/reset.component.css":
/*!*******************************************!*\
  !*** ./src/app/reset/reset.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jlc2V0L3Jlc2V0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/reset/reset.component.ts":
/*!******************************************!*\
  !*** ./src/app/reset/reset.component.ts ***!
  \******************************************/
/*! exports provided: ResetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetComponent", function() { return ResetComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");




let ResetComponent = class ResetComponent {
    constructor(useract, router) {
        this.useract = useract;
        this.router = router;
        this.errorMsg = [];
        this.user = {};
        this.success = false;
        this.isLoading = false;
    }
    ngOnInit() {
        document.querySelector("title").innerHTML = "Select Polling | Password";
        this.user.forgotPassword = this.useract.fpassword;
        this.user.username = this.useract.username;
    }
    resetPassword() {
        this.isLoading = true;
        this.useract.changeMyPassword(this.user).subscribe(() => {
            this.isLoading = false;
            this.errorMsg = [];
            this.success = true;
        }, (err) => {
            this.isLoading = false;
            this.success = false;
            this.errorMsg = err.error.errors;
        });
    }
};
ResetComponent.ctorParameters = () => [
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_3__["UserActionService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
ResetComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-reset',
        template: __webpack_require__(/*! raw-loader!./reset.component.html */ "./node_modules/raw-loader/index.js!./src/app/reset/reset.component.html"),
        styles: [__webpack_require__(/*! ./reset.component.css */ "./src/app/reset/reset.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_user_action_service__WEBPACK_IMPORTED_MODULE_3__["UserActionService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], ResetComponent);



/***/ }),

/***/ "./src/app/search.pipe.ts":
/*!********************************!*\
  !*** ./src/app/search.pipe.ts ***!
  \********************************/
/*! exports provided: SearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPipe", function() { return SearchPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SearchPipe = class SearchPipe {
    transform(value, args) {
        try {
            const filteredStudents = value.filter((element) => {
                return element.name.indexOf(args) > -1;
            });
            return filteredStudents;
        }
        catch (e) {
            return value;
        }
    }
};
SearchPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'search'
    })
], SearchPipe);



/***/ }),

/***/ "./src/app/signin.service.ts":
/*!***********************************!*\
  !*** ./src/app/signin.service.ts ***!
  \***********************************/
/*! exports provided: SigninService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigninService", function() { return SigninService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _signup_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signup.service */ "./src/app/signup.service.ts");




let SigninService = class SigninService {
    constructor(http, signup) {
        this.http = http;
        this.signup = signup;
    }
    login(student) {
        return this.http.post("https://www.selectpolling.ca/login", student);
    }
    loggedIn() {
        return this.http.get("https://www.selectpolling.ca/loggedin");
    }
    logout() {
        this.signup.msg = "";
        return this.http.get("https://www.selectpolling.ca/logout");
    }
};
SigninService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _signup_service__WEBPACK_IMPORTED_MODULE_3__["SignupService"] }
];
SigninService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _signup_service__WEBPACK_IMPORTED_MODULE_3__["SignupService"]])
], SigninService);



/***/ }),

/***/ "./src/app/signup.service.ts":
/*!***********************************!*\
  !*** ./src/app/signup.service.ts ***!
  \***********************************/
/*! exports provided: SignupService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupService", function() { return SignupService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let SignupService = class SignupService {
    constructor(http) {
        this.http = http;
        this.msg = "";
    }
    register(student) {
        return this.http.post("https://www.selectpolling.ca/register", student);
    }
};
SignupService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
SignupService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], SignupService);



/***/ }),

/***/ "./src/app/stv/stv.component.css":
/*!***************************************!*\
  !*** ./src/app/stv/stv.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".voteButton:hover {\n  cursor:pointer;\n  color:red;\n}\n\n.stv_elecs span:hover {\n  cursor:pointer;\n}\n\n.progress-bar {\n  transition: all 0.5s;\n}\n\n#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n.selectCandidate:hover {\n  cursor:pointer;\n}\n\n.logout:hover {\n  cursor: pointer;\n}\n\n.check {\n  color: green;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3R2L3N0di5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztFQUNkLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFFRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvc3R2L3N0di5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZvdGVCdXR0b246aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbiAgY29sb3I6cmVkO1xufVxuXG4uc3R2X2VsZWNzIHNwYW46aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuLnByb2dyZXNzLWJhciB7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXM7XG4gIHRyYW5zaXRpb246IGFsbCAwLjVzO1xufVxuXG4jbG9nbyB7XG4gIGNvbG9yOmJsYWNrO1xufVxuXG4jbG9nbzpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG5cbi5zZWxlY3RDYW5kaWRhdGU6aG92ZXIge1xuICBjdXJzb3I6cG9pbnRlcjtcbn1cblxuLmxvZ291dDpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNoZWNrIHtcbiAgY29sb3I6IGdyZWVuO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/stv/stv.component.ts":
/*!**************************************!*\
  !*** ./src/app/stv/stv.component.ts ***!
  \**************************************/
/*! exports provided: StvComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StvComponent", function() { return StvComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signin.service */ "./src/app/signin.service.ts");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_6__);







let StvComponent = class StvComponent {
    constructor(signin, useract, router) {
        this.signin = signin;
        this.useract = useract;
        this.router = router;
        this.errorMsg = [];
        this.success = false;
        this.STV_votes_name = [];
        this.STV_votes_id = [];
        this.highcharts = highcharts__WEBPACK_IMPORTED_MODULE_6__;
    }
    ngOnInit() {
        this.user = this.signin.student;
        this.election = this.useract.election;
        if (this.election.status) {
            document.querySelector('title').innerHTML = "Select Polling | Vote";
            if (this.election.type == "stv") {
                // fpp
                this.initializeCountDown(this.election);
                let x = (60 - new Date().getSeconds()) * 1000;
                this.timeOut = setTimeout(() => {
                    this.initializeCountDown(this.election);
                    this.interval = setInterval(() => {
                        this.initializeCountDown(this.election);
                    }, 60000);
                }, x);
                this.progressUpdate(this.election, this.election.type, false);
            }
            else if (this.election.type == "fpp") {
                this.router.navigate([`/election/stv/${this.election._id}`]);
            }
            else if (this.election.type == "approval") {
                this.router.navigate([`/election/approval/${this.election._id}`]);
            }
            this.socket_votes = socket_io_client__WEBPACK_IMPORTED_MODULE_5__("https://www.selectpolling.ca/update");
            this.socket_votes.on("updatedCount", (ob) => {
                this.progressUpdate(ob.updatedElection, "stv", true);
            });
            // join classroom
            this.socket_votes.emit("joinElectionRoom", this.election._id);
        }
        else {
            // archived
            document.querySelector('title').innerHTML = "Select Polling | Results";
            let adjustedData = [];
            let unadjustedData = [];
            let names = [];
            this.results = this.election.elected_STV.filter(ob => ob.quota > 0);
            this.election.candidates.forEach((candidate) => {
                this.election.elected_STV.forEach((vote) => {
                    if (vote._id == candidate._id) {
                        adjustedData.push(vote.quota);
                        names.push(candidate.name);
                    }
                });
                this.election.count_STV.forEach((vote) => {
                    if (vote._id == candidate._id) {
                        unadjustedData.push(vote.total);
                    }
                });
            });
            this.chartInfo = {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: this.election.title
                },
                xAxis: {
                    categories: names,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Votes',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                        name: 'Adjusted Votes',
                        data: adjustedData
                    }, {
                        name: 'Unadjusted Votes',
                        data: unadjustedData
                    }]
            };
        }
    }
    ngOnDestroy() {
        clearTimeout(this.timeOut);
        clearInterval(this.interval);
        if (this.logoutSub)
            this.logoutSub.unsubscribe();
        if (this.expiredElec)
            this.expiredElec.unsubscribe();
        if (this.voteSub)
            this.voteSub.unsubscribe();
    }
    logout() {
        this.logoutSub = this.signin.logout().subscribe((data) => {
            this.router.navigate(['/login']);
        }, (err) => {
        });
    }
    initializeCountDown(e) {
        let timeObject = [];
        const start = new Date(e.date).getTime();
        const duration = e.duration * 3600000;
        const expiration = start + duration;
        let current = new Date().getTime();
        if (current < expiration) {
            const delta_s = (current - start) / 3600000;
            const delta_d = e.duration - delta_s;
            const re1 = new RegExp("\\d+");
            const hours = delta_d.toString().match(re1)[0];
            const min = Math.round((delta_d - Math.floor(delta_d)) * 60).toString();
            if (min.length <= 1) {
                if (parseInt(min) == 0 && parseInt(hours) == 0) {
                    timeObject.push({ "time": "expired", "id": e._id });
                }
                else {
                    timeObject.push({ "time": `${hours}h:0${min}m` });
                }
            }
            else {
                timeObject.push({ "time": `${hours}h:${min}m` });
            }
        }
        else {
            timeObject.push({ "time": "expired", "id": e._id });
        }
        this.countdownTime = timeObject;
        if (this.countdownTime[0].time == "expired") {
            this.expiredElec = this.useract.expired([this.countdownTime[0].id]).subscribe(() => {
            }, (err) => {
            });
        }
    }
    progressUpdate(activeElection, option, socketInput) {
        let width = {};
        let count = {};
        activeElection.count_STV.forEach((countObject) => {
            if (countObject.ranks) {
                count[countObject._id] = countObject.ranks.length;
                let pct = (countObject.ranks.length * 100) / this.useract.classSize;
                width[countObject._id] = `${pct}%`;
            }
            else {
                count[countObject._id] = 0;
                width[countObject._id] = `0%`;
            }
        });
        if (!socketInput) {
            let allStudents = {};
            activeElection.voteStatus.forEach((studentObject) => {
                if (studentObject.didVote) {
                    allStudents[studentObject.studentnumber] = true;
                }
                else {
                    allStudents[studentObject.studentnumber] = false;
                }
            });
            this.studentVoterStatus = allStudents;
        }
        this.countOb = count;
        this.studentWidths = width;
    }
    myVote(id, student, option) {
        this.voteSub = this.useract.vote(id, student, option).subscribe((data) => {
            this.studentVoterStatus[this.user.studentnumber] = true;
            this.errorMsg = [];
            this.success = true;
            this.socket_votes.emit("check", this.election._id);
        }, (err) => {
            this.errorMsg = err.error.errors;
        });
    }
    append(name, id) {
        let current_name_arr = this.STV_votes_name;
        if (current_name_arr.indexOf(name) == -1) {
            current_name_arr.push(name);
            this.STV_votes_name = current_name_arr;
        }
        let current_id_arr = this.STV_votes_id;
        if (current_id_arr.indexOf(id) == -1) {
            current_id_arr.push(id);
            this.STV_votes_id = current_id_arr;
        }
    }
    delRank(r) {
        this.STV_votes_name.splice(r, 1);
        this.STV_votes_id.splice(r, 1);
    }
    electionTypes() {
        this.router.navigate(['/whatis']);
    }
};
StvComponent.ctorParameters = () => [
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
StvComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-stv',
        template: __webpack_require__(/*! raw-loader!./stv.component.html */ "./node_modules/raw-loader/index.js!./src/app/stv/stv.component.html"),
        styles: [__webpack_require__(/*! ./stv.component.css */ "./src/app/stv/stv.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_signin_service__WEBPACK_IMPORTED_MODULE_3__["SigninService"], _user_action_service__WEBPACK_IMPORTED_MODULE_4__["UserActionService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], StvComponent);



/***/ }),

/***/ "./src/app/terms/terms.component.css":
/*!*******************************************!*\
  !*** ./src/app/terms/terms.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlcm1zL3Rlcm1zLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/terms/terms.component.ts":
/*!******************************************!*\
  !*** ./src/app/terms/terms.component.ts ***!
  \******************************************/
/*! exports provided: TermsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsComponent", function() { return TermsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let TermsComponent = class TermsComponent {
    constructor(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | Terms');
        this.metaService.updateTag({ name: 'description', content: 'For further questions about our terms and conditions, please contact contact@selectpolling.ca.' });
        this.metaService.updateTag({ name: 'keywords', content: 'terms' });
    }
};
TermsComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"] }
];
TermsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-terms',
        template: __webpack_require__(/*! raw-loader!./terms.component.html */ "./node_modules/raw-loader/index.js!./src/app/terms/terms.component.html"),
        styles: [__webpack_require__(/*! ./terms.component.css */ "./src/app/terms/terms.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"]])
], TermsComponent);



/***/ }),

/***/ "./src/app/user-action.service.ts":
/*!****************************************!*\
  !*** ./src/app/user-action.service.ts ***!
  \****************************************/
/*! exports provided: UserActionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserActionService", function() { return UserActionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let UserActionService = class UserActionService {
    constructor(http) {
        this.http = http;
        this.currentUrl = "";
        this.election = {};
    }
    //dashboard
    searchClassrooms(query) {
        return this.http.post("https://www.selectpolling.ca/class/search", { name: query });
    }
    unlockClass(pwd, name) {
        return this.http.post("https://www.selectpolling.ca/class/password", { password: pwd, name: name });
    }
    // create
    //
    submitClass(classlist) {
        let classFile = new FormData();
        classFile.append('classfile', classlist[0]);
        return this.http.post("https://www.selectpolling.ca/class/edit", classFile);
    }
    create(students, classInfo) {
        const classInformation = classInfo;
        classInformation['students'] = students;
        return this.http.post("https://www.selectpolling.ca/class/submit", classInformation);
    }
    deleteClass(password, name) {
        return this.http.post("https://www.selectpolling.ca/class/delete-class", { password: password, name: name });
    }
    leaveClass(password, name) {
        return this.http.post("https://www.selectpolling.ca/class/leave-class", { password: password, name: name });
    }
    statusCheck(id) {
        return this.http.post("https://www.selectpolling.ca/class/status", { name: id });
    }
    addToElectionSheet(ticket) {
        return this.http.post("https://www.selectpolling.ca/class/ticket", ticket);
    }
    submitTicket(sheet, room) {
        return this.http.post("https://www.selectpolling.ca/class/submit-ticket", { sheet: sheet, classname: room });
    }
    accessPollKey(password, classname) {
        return this.http.post("https://www.selectpolling.ca/class/access-poll/key", { password: password, name: classname });
    }
    accessPollCode(password, classname) {
        return this.http.post("https://www.selectpolling.ca/class/access-poll/code", { password: password, name: classname });
    }
    vote(id, student, option) {
        return this.http.post("https://www.selectpolling.ca/class/vote", { id: id, student: student, type: option });
    }
    expired(ids) {
        return this.http.post("https://www.selectpolling.ca/class/expired", { ids: ids });
    }
    deleteStudent(student, name) {
        student['classname'] = name;
        return this.http.post("https://www.selectpolling.ca/class/delete-student", student);
    }
    addStudentToClass(student, name) {
        student['classname'] = name;
        return this.http.post("https://www.selectpolling.ca/class/add-student", student);
    }
    deletePoll(id, name, pwd) {
        return this.http.post("https://www.selectpolling.ca/class/delete-poll", { id: id, name: name, password: pwd });
    }
    deleteMyAcc(password) {
        return this.http.post("https://www.selectpolling.ca/delete-account", { password: password });
    }
    pwd(pwdOb) {
        return this.http.post("https://www.selectpolling.ca/change-pwd", pwdOb);
    }
    forgotPassword(pwdOb) {
        return this.http.post("https://www.selectpolling.ca/forgot-password", pwdOb);
    }
    accessForgotPasswordView(username, hash) {
        return this.http.get(`https://www.selectpolling.ca/fpwd/${username}/${hash}`);
    }
    changeMyPassword(pwdOb) {
        return this.http.post("https://www.selectpolling.ca/fpwd/change", pwdOb);
    }
    contact(question) {
        return this.http.post("https://www.selectpolling.ca/contact", question);
    }
    pollPermission(id) {
        return this.http.get(`https://www.selectpolling.ca/class/permission/${id}`);
    }
};
UserActionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
UserActionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], UserActionService);



/***/ }),

/***/ "./src/app/user-search.pipe.ts":
/*!*************************************!*\
  !*** ./src/app/user-search.pipe.ts ***!
  \*************************************/
/*! exports provided: UserSearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSearchPipe", function() { return UserSearchPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let UserSearchPipe = class UserSearchPipe {
    transform(value, term, field) {
        try {
            if (term.length != 0) {
                const filteredStudents = value.filter((student) => {
                    return student[field].toString().toLowerCase().indexOf(term.toLowerCase()) > -1;
                });
                return filteredStudents;
            }
            else {
                return value;
            }
        }
        catch (e) {
            return value;
        }
    }
};
UserSearchPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'userSearch'
    })
], UserSearchPipe);



/***/ }),

/***/ "./src/app/vote.guard.ts":
/*!*******************************!*\
  !*** ./src/app/vote.guard.ts ***!
  \*******************************/
/*! exports provided: VoteGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoteGuard", function() { return VoteGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _user_action_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-action.service */ "./src/app/user-action.service.ts");
/* harmony import */ var _signin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signin.service */ "./src/app/signin.service.ts");





let VoteGuard = class VoteGuard {
    constructor(router, useract, signin) {
        this.router = router;
        this.useract = useract;
        this.signin = signin;
    }
    canActivate(next, state) {
        let p = new Promise((resolve, reject) => {
            this.signin.loggedIn().subscribe((data) => {
                this.signin.student = data.student;
                resolve();
            }, (err) => {
                reject(err);
            });
        });
        return p.then(() => {
            return new Promise((resolve, reject) => {
                this.useract.pollPermission(next.params.id).subscribe((res) => {
                    this.useract.election = res.election;
                    this.useract.classSize = res.classSize;
                    resolve();
                }, (err) => {
                    reject(err);
                });
            });
        }).then(() => {
            return true;
        }).catch((err) => {
            this.router.navigate(['/login']);
            return false;
        });
    }
};
VoteGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _user_action_service__WEBPACK_IMPORTED_MODULE_3__["UserActionService"] },
    { type: _signin_service__WEBPACK_IMPORTED_MODULE_4__["SigninService"] }
];
VoteGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _user_action_service__WEBPACK_IMPORTED_MODULE_3__["UserActionService"], _signin_service__WEBPACK_IMPORTED_MODULE_4__["SigninService"]])
], VoteGuard);



/***/ }),

/***/ "./src/app/whatis/whatis.component.css":
/*!*********************************************!*\
  !*** ./src/app/whatis/whatis.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#logo {\n  color:black;\n}\n\n#logo:hover {\n  text-decoration: none;\n  cursor:pointer;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2hhdGlzL3doYXRpcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC93aGF0aXMvd2hhdGlzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbG9nbyB7XG4gIGNvbG9yOmJsYWNrO1xufVxuXG4jbG9nbzpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY3Vyc29yOnBvaW50ZXI7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/whatis/whatis.component.ts":
/*!********************************************!*\
  !*** ./src/app/whatis/whatis.component.ts ***!
  \********************************************/
/*! exports provided: WhatisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatisComponent", function() { return WhatisComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let WhatisComponent = class WhatisComponent {
    constructor(titleService, metaService) {
        this.titleService = titleService;
        this.metaService = metaService;
    }
    ngOnInit() {
        this.titleService.setTitle('Select Polling | Election types');
        this.metaService.updateTag({ name: 'description', content: 'A brief description of STV (single transferrable voting), Preferential (instant-runoff), FPP (first-past-the-post), and Approval voting systems.' });
        this.metaService.updateTag({ name: 'keywords', content: 'STV, approval voting, preferential voting, first-past-the-post voting' });
    }
};
WhatisComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"] }
];
WhatisComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-whatis',
        template: __webpack_require__(/*! raw-loader!./whatis.component.html */ "./node_modules/raw-loader/index.js!./src/app/whatis/whatis.component.html"),
        styles: [__webpack_require__(/*! ./whatis.component.css */ "./src/app/whatis/whatis.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"]])
], WhatisComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mathewdaniel/Desktop/select/frontend-select/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map