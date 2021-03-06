import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from '../services/game.service';
import { Players } from '../../../../both/collections/players.collection';
import { Games } from '../../../../both/collections/games.collection';

//noinspection TypeScriptCheckImport
import template from './login-form.component.html';

@Component({
    selector: 'st-login-form',
    template
})
export class LoginFormComponent implements OnInit {
    error: string;
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private gameService : GameService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            gameId: [ '', Validators.required ],
            username: [ '', Validators.required ]
        });
    }

    loginPlayer(): void {
        if (!this.loginForm.valid) {
            this.error = "Please fill in both fields";
            return;
        }

        const {gameId, username} = this.loginForm.value;

        const game = Games.findOne({gameId});

        if (!game) {
            this.error = "Invalid game pin :'(";
            return;
        }

        if (game.started) {
            this.error = "Game has already started";
            return;
        }

        Players
            .insert({username, gameId})
            .first()
            .subscribe((id : string) => {
                this.gameService.activePlayerId = id;
                this.router.navigate(['/client/lobby', gameId]);
            });
    }
}
