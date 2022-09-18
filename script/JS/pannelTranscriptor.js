var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fetchLocation = "http://localhost:3001/game/0";
var pannelTranscriptor = /** @class */ (function () {
    function pannelTranscriptor(props) {
        this.htmlLink = document.querySelector("" + props.htmlClassList);
        this.contentStorage = [];
        this.start();
    }
    pannelTranscriptor.prototype.getGameInterface = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result, gameDescription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(fetchLocation)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        gameDescription = _a.sent();
                        this.gameDescription = gameDescription.data.response;
                        this.gamePannel = this.gameDescription.confPannel;
                        return [2 /*return*/];
                }
            });
        });
    };
    pannelTranscriptor.prototype.buildPannel = function () {
        var pannelNames = this.htmlLink.children[0];
        for (var i = 0; i < this.gamePannel.length; i++) {
            var pannel_1 = [];
            var newName = document.createElement("div");
            newName.classList.add("pannelName");
            newName.innerHTML = this.gamePannel[i].name;
            pannelNames.appendChild(newName);
            for (var j = 0; j < this.gamePannel[i].confOptions.length; j++) {
                var optionContainer = document.createElement("div");
                optionContainer.classList.add("content");
                var optionName = document.createElement("div");
                optionName.classList.add("optionName");
                optionName.innerHTML = this.gamePannel[i].confOptions[j].name;
                optionContainer.appendChild(optionName);
                var optionContent = document.createElement("div");
                var optionInput = void 0;
                switch (this.gamePannel[i].confOptions[j].type) {
                    case "checkBox":
                        optionInput = document.createElement("input");
                        optionInput.setAttribute("type", "checkbox");
                        break;
                    case 'button':
                        optionInput = document.createElement("button");
                        break;
                    case 'text':
                        optionInput = document.createElement("textarea");
                        break;
                    default:
                        break;
                }
                optionContent.appendChild(optionInput);
                optionContent.classList.add("optionContent");
                optionContainer.appendChild(optionContent);
                console.log(optionContainer);
                pannel_1.push(optionContainer);
            }
            console.log(pannel_1);
            this.contentStorage.push(pannel_1);
        }
    };
    pannelTranscriptor.prototype.displayPannel = function (pannelNb) {
        var pannelContent = this.htmlLink.children[1];
        pannelContent.innerHTML = "";
        for (var i in this.contentStorage[pannelNb]) {
            pannelContent.appendChild(this.contentStorage[pannelNb][i]);
        }
    };
    pannelTranscriptor.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGameInterface()];
                    case 1:
                        _a.sent();
                        this.buildPannel();
                        this.displayPannel(0);
                        console.log(this.contentStorage);
                        return [2 /*return*/];
                }
            });
        });
    };
    return pannelTranscriptor;
}());
var pannel = new pannelTranscriptor({
    htmlClassList: ".pannelContainer"
});
