document.addEventListener('DOMContentLoaded', () => {

    // --- 가따후 시스템 로직 (Gattahus System Logic) ---
    const gattahusApp = document.getElementById('gattahus-app');
    if (gattahusApp) {
        let currentLevel = 15 * 2;
        let currentStage = 1;
        let currentBetUnit = 0;
        let totalUnits = 15 * 2;
        let winStreak = 0;
        let betHistory = [];

        const levelMap = {
            6: { 1: { bet: 3 * 2, win: { type: 'goto', level: 6 * 2 }, lose: { type: 'gameOver' } } },
            8: { 1: { bet: 4 * 2, win: { type: 'goto', level: 8 * 2 }, lose: { type: 'gameOver' } } },
            10: { 1: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2, 4 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 3 * 2, win: { type: 'calcLevelSubUnit', subtract: 2 * 2 }, lose: { type: 'gameOver' } } },
            12: { 1: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2, 4 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 4 * 2, win: { type: 'calcLevelSubUnit', subtract: 2 * 2 }, lose: { type: 'gameOver' } } },
            14: { 1: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2, 4 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 5 * 2, win: { type: 'calcLevelSubUnit', subtract: 2 * 2 }, lose: { type: 'gameOver' } } },
            16: { 1: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2, 4 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 6 * 2, win: { type: 'calcLevelSubUnit', subtract: 2 * 2 }, lose: { type: 'gameOver' } } },
            18: { 1: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2, 4 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 7 * 2, win: { type: 'calcLevelSubUnit', subtract: 2 * 2 }, lose: { type: 'gameOver' } } },
            20: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 7 * 2, win: { type: 'goto', level: 14 * 2 }, lose: { type: 'gameOver' } } },
            22: { 1: { bet: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 7 * 2, win: { type: 'goto', level: 14 * 2 }, lose: { type: 'gameOver' } } },
            24: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet: 7 * 2, win: { type: 'goto', level: 14 * 2 }, lose: { type: 'gameOver' } } },
            26: { 1: { bet: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet: 7 * 2, win: { type: 'goto', level: 14 * 2 }, lose: { type: 'gameOver' } } },
            28: { 1: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [2 * 2, 4 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 3 * 2, win: { type: 'goto', level: 15 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 5 * 2 }, lose: { type: 'gotoLevel', level: 6 * 2 } } },
            30: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            32: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            34: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            36: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            38: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            40: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            42: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 6 * 2 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 * 2 } } },
            44: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 9 * 2, bet2: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9 * 2, 3 * 2], subtract: 6 * 2 }, lose: { type: 'specialLoseLevel22_4' } } },
            46: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 9 * 2, bet2: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9 * 2, 3 * 2], subtract: 6 * 2 }, lose: { type: 'specialLoseLevel23_4' } } },
            48: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 6 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 6 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 9 * 2, bet2: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9 * 2, 3 * 2], subtract: 6 * 2 }, lose: { type: 'specialLoseLevel24_4' } } },
            50: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 4 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 5 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 5 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 9 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9 * 2, 2 * 2], subtract: 6 * 2 }, lose: { type: 'specialLoseLevel25_4' } } },
            52: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 3 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 4 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 4 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet1: 9 * 2, bet2: 1 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9 * 2, 1 * 2], subtract: 6 * 2 }, lose: { type: 'specialLoseLevel26_4' } } },
            54: { 1: { bet1: 1 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 2 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 2 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 3 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 3 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet: 9 * 2, win: { type: 'goto', level: 30 * 2 }, lose: { type: 'gotoLevel', level: 12 * 2 } } },
            56: { 1: { bet1: 1 * 2, bet2: 1 * 2, win: { type: 'calcLevelSumCurrentLevel', units: [1 * 2, 1 * 2] }, lose: { type: 'goto', stage: 2 } }, 2: { bet1: 2 * 2, bet2: 1 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2 * 2, 1 * 2], subtract: 1 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 2 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 2 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet: 8 * 2, win: { type: 'goto', level: 30 * 2 }, lose: { type: 'gotoLevel', level: 14 * 2 } } },
            58: { 1: { bet: 1 * 2, win: { type: 'goto', level: 30 * 2 }, lose: { type: 'goto', stage: 2 } }, 2: { bet: 2 * 2, win: { type: 'goto', level: 30 * 2 }, lose: { type: 'goto', stage: 3 } }, 3: { bet1: 3 * 2, bet2: 1 * 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3 * 2, 1 * 2], subtract: 3 * 2 }, lose: { type: 'goto', stage: 4 } }, 4: { bet: 7 * 2, win: { type: 'goto', level: 30 * 2 }, lose: { type: 'gotoLevel', level: 16 * 2 } } },
            60: { 1: { bet: 10 * 2, win: { type: 'gameWin' }, lose: { type: 'gameOver' } } }
        };

        const currentLevelEl = gattahusApp.querySelector('#currentLevel');
        const currentStageEl = gattahusApp.querySelector('#currentStage');
        const currentBetUnitEl = gattahusApp.querySelector('#currentBetUnit');
        const totalUnitsEl = gattahusApp.querySelector('#totalUnits');
        const messageEl = gattahusApp.querySelector('#message');
        const winButton = gattahusApp.querySelector('#winButton');
        const loseButton = gattahusApp.querySelector('#loseButton');
        const resetButton = gattahusApp.querySelector('#resetButton');
        const undoButton = gattahusApp.querySelector('#undoButton');

        function initializeGame() {
            currentLevel = 15 * 2;
            currentStage = 1;
            totalUnits = 15 * 2;
            winStreak = 0;
            betHistory = [];
            updateDisplay();
            messageEl.textContent = `게임 시작! 레벨 ${currentLevel}, ${currentStage}단계.`;
            messageEl.classList.remove('win', 'lose');
            enableButtons();
        }

        function updateDisplay() {
            const levelData = levelMap[currentLevel];
            if (levelData && levelData[currentStage]) {
                const stageData = levelData[currentStage];
                if (stageData.bet) {
                    currentBetUnit = stageData.bet;
                } else if (stageData.bet1 && stageData.bet2) {
                    currentBetUnit = winStreak === 0 ? stageData.bet1 : stageData.bet2;
                } else {
                    currentBetUnit = 0;
                }
            } else {
                currentBetUnit = 0;
            }

            currentLevelEl.textContent = currentLevel;
            currentStageEl.textContent = currentStage;
            currentBetUnitEl.textContent = currentBetUnit;
            totalUnitsEl.textContent = totalUnits;

            if (totalUnits >= 30 * 2) {
                gameWin("축하합니다! 총 유닛이 60에 도달하여 게임에 승리했습니다!");
                return;
            }
            if (totalUnits <= 0 && !(currentLevel === 30 && currentStage === 1 && totalUnits === 30)) {
                gameOver("총 유닛이 0이거나 0 미만이 되어 게임에 패배했습니다.");
                return;
            }
            undoButton.disabled = betHistory.length === 0;
        }

        function gameWin(msg) {
            messageEl.textContent = msg;
            messageEl.classList.remove('lose');
            messageEl.classList.add('win');
            disableButtons();
            currentLevelEl.textContent = "승리";
            currentStageEl.textContent = "승리";
            currentBetUnitEl.textContent = "0";
        }

        function gameOver(msg) {
            messageEl.textContent = msg;
            messageEl.classList.remove('win');
            messageEl.classList.add('lose');
            disableButtons();
            currentLevelEl.textContent = "패배";
            currentStageEl.textContent = "패배";
            currentBetUnitEl.textContent = "0";
        }

        function disableButtons() {
            winButton.disabled = true;
            loseButton.disabled = true;
            undoButton.disabled = true;
        }

        function enableButtons() {
            winButton.disabled = false;
            loseButton.disabled = false;
            undoButton.disabled = betHistory.length === 0;
        }

        function saveState() {
            betHistory.push({ level: currentLevel, stage: currentStage, totalUnits: totalUnits, winStreak: winStreak });
        }

        function handleWin() {
            saveState();
            const levelData = levelMap[currentLevel];
            if (!levelData || !levelData[currentStage]) {
                gameOver("시스템 오류로 게임 종료.");
                return;
            }
            const stageData = levelData[currentStage];
            totalUnits += currentBetUnit;

            const winAction = stageData.win;
            if (winAction.type === 'goto') {
                currentLevel = winAction.level;
                currentStage = 1;
                winStreak = 0;
                messageEl.textContent = `승리! 레벨 ${currentLevel}로 이동합니다.`;
            } else if (winAction.type === 'calcLevelSumCurrentLevel' || winAction.type === 'calcLevelSumCurrentLevelSubtract') {
                winStreak++;
                 if (winStreak === 2 || (!stageData.bet1 && !stageData.bet2)) {
                    const sumOfBetUnits = winAction.units.reduce((sum, u) => sum + u, 0);
                    currentLevel += sumOfBetUnits - (winAction.subtract || 0);
                    currentStage = 1;
                    winStreak = 0;
                    messageEl.textContent = `승리! 레벨 ${currentLevel}로 이동합니다.`;
                } else {
                    messageEl.textContent = `승리! 2번째 베팅(${stageData.bet2 || stageData.bet}유닛)을 시도합니다.`;
                }
            } else if (winAction.type === 'gameWin') {
                gameWin("최종 목표 달성! 게임에 승리했습니다!");
                return;
            }
            updateDisplay();
        }

        function handleLose() {
            saveState();
            const levelData = levelMap[currentLevel];
            if (!levelData || !levelData[currentStage]) {
                gameOver("시스템 오류로 게임 종료.");
                return;
            }
            const stageData = levelData[currentStage];
            totalUnits -= currentBetUnit;
            winStreak = 0;

            const loseAction = stageData.lose;
            if (loseAction.type === 'gameOver') {
                gameOver("베팅 패배로 유닛이 소진되었습니다.");
            } else if (loseAction.type === 'goto') {
                currentStage = loseAction.stage;
                messageEl.textContent = `패배! ${currentStage}단계로 이동합니다.`;
            } else if (loseAction.type === 'gotoLevel') {
                currentLevel = loseAction.level;
                currentStage = 1;
                messageEl.textContent = `패배! 레벨 ${currentLevel}로 이동합니다.`;
            } else if (loseAction.type === 'calcLevelSubCurrentLevel') {
                currentLevel -= loseAction.subtract;
                currentStage = 1;
                messageEl.textContent = `패배! 레벨 ${currentLevel}로 이동합니다.`;
            } else if (loseAction.type && loseAction.type.startsWith('specialLoseLevel')) {
                 let nextLevel = currentLevel;
                 if (currentBetUnit === (stageData.bet1)) {
                    nextLevel = currentLevel - (15 * 2);
                    messageEl.textContent = `패배! (1번째 베팅 실패) 레벨 ${nextLevel}로 이동합니다.`;
                } else if (currentBetUnit === (stageData.bet2)) {
                    if (loseAction.type === 'specialLoseLevel25_4') {
                        nextLevel = currentLevel + (1 * 2);
                    } else if (loseAction.type === 'specialLoseLevel26_4') {
                        nextLevel = currentLevel + (2 * 2);
                    } else {
                        nextLevel = currentLevel;
                    }
                     messageEl.textContent = `패배! (2번째 베팅 실패) 레벨 ${nextLevel}로 이동합니다.`;
                }
                currentLevel = nextLevel;
                currentStage = 1;
            } else {
                 gameOver("시스템 오류로 게임 종료.");
                 return;
            }
            updateDisplay();
        }

        function handleReset() {
            if (confirm("정말로 '가따후 시스템' 게임을 리셋하시겠습니까?")) {
                initializeGame();
            }
        }

        function handleUndo() {
            if (betHistory.length > 0) {
                const prevState = betHistory.pop();
                currentLevel = prevState.level;
                currentStage = prevState.stage;
                totalUnits = prevState.totalUnits;
                winStreak = prevState.winStreak;
                messageEl.textContent = "이전 상태로 돌아갑니다.";
                messageEl.classList.remove('win', 'lose');
                updateDisplay();
                enableButtons();
            }
        }

        winButton.addEventListener('click', handleWin);
        loseButton.addEventListener('click', handleLose);
        resetButton.addEventListener('click', handleReset);
        undoButton.addEventListener('click', handleUndo);

        initializeGame();
    }

    // --- 악마의 바카라 예언자 로직 (Demon Baccarat Oracle Logic) ---
    const oracleApp = document.getElementById('oracle-app');
    if (oracleApp) {
        // State variables
        let state = {
            dice: [],
            result: '',
            count: 0,
            bankerCount: 0,
            playerCount: 0,
            tieCount: 0,
            consecutiveBanker: 0,
            consecutivePlayer: 0,
            consecutiveTie: 0,
            lastResult: null,
            bankerBeforeTie: 0,
            playerBeforeTie: 0,
        };
        let history = [];

        // DOM Elements
        const rollButton = oracleApp.querySelector('#oracle-rollButton');
        const undoButton = oracleApp.querySelector('#oracle-undoButton');
        const resetButton = oracleApp.querySelector('#oracle-resetButton');
        const diceEl = oracleApp.querySelector('#oracle-dice');
        const resultTextEl = oracleApp.querySelector('#oracle-result-text');
        const countEl = oracleApp.querySelector('#oracle-count');
        const bankerSummaryEl = oracleApp.querySelector('#oracle-banker-summary');
        const playerSummaryEl = oracleApp.querySelector('#oracle-player-summary');
        const tieSummaryEl = oracleApp.querySelector('#oracle-tie-summary');

        const updateUI = () => {
            diceEl.textContent = state.dice.length ? state.dice.join(', ') : '아직 예언되지 않음';
            resultTextEl.textContent = state.result;
            countEl.textContent = state.count;
            bankerSummaryEl.textContent = `BANKER: ${state.bankerCount} (${state.consecutiveBanker} 연속)`;
            playerSummaryEl.textContent = `PLAYER: ${state.playerCount} (${state.consecutivePlayer} 연속)`;
            tieSummaryEl.textContent = `TIE: ${state.tieCount} (${state.consecutiveTie} 연속)`;
            undoButton.disabled = history.length === 0;
        };

        const saveStateToHistory = () => {
            history.push(JSON.parse(JSON.stringify(state))); // Deep copy
        };
        
        const rollDice = () => {
            saveStateToHistory();

            const newDice = Array.from({ length: 30 }, () => Math.floor(Math.random() * 6) + 1);
            state.dice = newDice;

            const oddCount = newDice.filter(num => num % 2 === 1).length;
            const evenCount = newDice.filter(num => num % 2 === 0).length;

            let currentResult = '';
            if (oddCount > evenCount) {
                currentResult = 'BANKER';
            } else if (evenCount > oddCount) {
                currentResult = 'PLAYER';
            } else {
                currentResult = 'TIE';
            }
            state.result = currentResult;
            state.count++;

            // Update counts
            if (currentResult === 'BANKER') state.bankerCount++;
            else if (currentResult === 'PLAYER') state.playerCount++;
            else if (currentResult === 'TIE') state.tieCount++;
            
            // Logic for consecutive counts
            if (currentResult === 'TIE') {
                state.consecutiveTie++;
                if (state.lastResult !== 'TIE') {
                    state.bankerBeforeTie = state.consecutiveBanker;
                    state.playerBeforeTie = state.consecutivePlayer;
                }
            } else if (currentResult === 'BANKER') {
                state.consecutiveTie = 0;
                state.consecutivePlayer = 0;
                if (state.lastResult === 'BANKER') {
                    state.consecutiveBanker++;
                } else if (state.lastResult === 'TIE') {
                    state.consecutiveBanker = state.bankerBeforeTie + 1;
                } else {
                    state.consecutiveBanker = 1;
                }
                state.bankerBeforeTie = 0;
                state.playerBeforeTie = 0;
            } else { // PLAYER
                state.consecutiveTie = 0;
                state.consecutiveBanker = 0;
                if (state.lastResult === 'PLAYER') {
                    state.consecutivePlayer++;
                } else if (state.lastResult === 'TIE') {
                    state.consecutivePlayer = state.playerBeforeTie + 1;
                } else {
                    state.consecutivePlayer = 1;
                }
                state.bankerBeforeTie = 0;
                state.playerBeforeTie = 0;
            }

            state.lastResult = currentResult;
            updateUI();
        };
        
        const goBack = () => {
            if (history.length > 0) {
                const previousState = history.pop();
                state = previousState;
                updateUI();
            }
        };

        const resetGame = () => {
            if (confirm("정말로 '악마의 바카라 예언자'를 리셋하시겠습니까?")) {
                state = {
                    dice: [], result: '', count: 0, bankerCount: 0, playerCount: 0, tieCount: 0,
                    consecutiveBanker: 0, consecutivePlayer: 0, consecutiveTie: 0,
                    lastResult: null, bankerBeforeTie: 0, playerBeforeTie: 0,
                };
                history = [];
                updateUI();
            }
        };

        rollButton.addEventListener('click', rollDice);
        undoButton.addEventListener('click', goBack);
        resetButton.addEventListener('click', resetGame);
        
        updateUI(); // Initial UI setup
    }
});
