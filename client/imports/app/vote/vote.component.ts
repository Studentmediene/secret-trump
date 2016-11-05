import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Elections } from '../../../../both/collections/elections.collection';
import { Election } from '../../../../both/models/election.model';
import { Player } from '../../../../both/models/player.model';

//noinspection TypeScriptCheckImport
import template from './vote.component.html';
//noinspection TypeScriptCheckImport
import style from './vote.component.scss';
@Component({
    selector: 'st-vote',
    template,
    styles: [ style ]
})
export class VoteComponent implements OnInit {

    private gameId: string;

    private election: Election;
    private candidate: Player;

    constructor() {}

    ngOnInit() {
        // TODO: Get gameId from common service
        // this.gameId = ;
        let elections: Observable<Election[]> = Elections.find({gameId: this.gameId}).zone();
        elections.subscribe(
            (elections: Election[]) => {
                this.election = elections[elections.length - 1];
                this.candidate = this.election.candidate;
            }
        );
    }

    private vote(vote: boolean) {
        console.debug('vote = ' + vote);
        if (vote) {
        } else {
        }
    }

}