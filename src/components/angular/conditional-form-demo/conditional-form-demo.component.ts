import { CommonModule } from '@angular/common';
import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Subject, takeUntil } from 'rxjs';

interface UniverseOption {
  key: string;
  name: string;
  sub?: UniverseOption[];
}

@Component({
  selector: 'app-conditional-form-demo',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule],
  styleUrls: ["conditional-form-demo.scss", "../mat-styles.scss"],
  templateUrl: "conditional-form-demo.html",
})
export class ConditionalFormDemo implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  static clientProviders = [provideAnimations()];
  public universesForm: FormGroup = new FormGroup([]);

  universeList: UniverseOption[] = [
    {
      key: 'starTrek',
      name: 'Star Trek',
      sub: [
        { key: 'tos', name: 'The Original Series' },
        { key: 'ds9', name: 'Deep Space Nine' },
        { key: 'tng', name: 'The Next Generation' },
        { key: 'dsc', name: 'Discovery' },
        { key: 'snw', name: 'Strange New Worlds' },
        { key: 'ld', name: 'Lower Decks' },
        { key: 'pcd', name: 'Picard' }
      ]
    },
    {
      key: 'marvel',
      name: 'Marvel',
      sub: [
        { key: 'movies', name: 'Movies' },
        { key: 'comics', name: 'Comics' }
      ]
    },
    {
      key: 'dc',
      name: 'DC',
      sub: [
        { key: 'movies', name: 'Movies' },
        { key: 'comics', name: 'Comics' }
      ]
    },
    { key: 'battlestar-galactica', name: 'Battlestar Galactica' },
    {
      key: 'stargate',
      name: 'Stargate',
      sub: [
        { key: 'sg1', name: 'SG-1' },
        { key: 'atlantis', name: 'Atlantis' },
        { key: 'universe', name: 'Universe' }
      ]
    },
    { key: 'dune', name: 'Dune' },
    { key: 'starWars', name: 'Star Wars' }
  ];

  selectedUniverses: UniverseOption[] = [];
  selectedSubUniverses: UniverseOption[] = [];
  showSub: boolean = false;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.formInit();
  }

  ngOnInit() {
    this.universesForm.get('universes')?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((selectedUniverses: UniverseOption[]) => {
      this.selectedSubUniverses = selectedUniverses.filter(universe => universe.sub && universe.sub.length > 0);
      this.updateSubControlList(selectedUniverses);
    });
    this.universesForm.get('subUniverses')?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((selectedSubUniverses: UniverseOption[]) => {
    })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  formInit() {
    this.universesForm = this.formBuilder.group({
      universes: this.formBuilder.control<UniverseOption[]>([]),
      subUniverses: this.formBuilder.array<FormControl<UniverseOption | null>>([]),
    });
  }

  get subUniverses() {
    return this.universesForm.controls.subUniverses as FormArray;
  }

  updateSubControlList(selected: UniverseOption[]) {
    const selectedKeys = new Set(selected.map(u => u.key));

    // Remove controls for deselected universes
    for (let i = this.subUniverses.length - 1; i >= 0; i--) {
      const control = this.subUniverses.at(i);
      const universeKey = control.value?.key;

      if (universeKey && !selectedKeys.has(universeKey)) {
        this.subUniverses.removeAt(i);
      }
    }

    // Add/Update controls for selected universes
    selected.forEach(universe => {
      if (universe.sub && universe.sub.length > 0) {
        let existingControl = this.subUniverses.controls.find(c => c.value?.key === universe.key);

        if (!existingControl) {
          const defaultValue = universe;
          this.subUniverses.push(this.formBuilder.control<UniverseOption | null>(defaultValue));
        }
        else if (existingControl.value && !existingControl.value?.sub) {
          existingControl.setValue(universe.sub[0]);
        }
      }
    });
  }

  combineUniverseSelections(universes: UniverseOption[], subUniverseControls: FormControl<UniverseOption>[]): UniverseOption[] {
    const combinedSelections: UniverseOption[] = [];

    // Add universes without sub-universes
    universes.forEach((universe: UniverseOption) => {
      if (!universe.sub || universe.sub.length === 0) {
        combinedSelections.push(universe);
      }
    });

    // Add universes with sub-universes (using selected sub-universe)
    subUniverseControls.forEach(control => {
      const selectedSubUniverse = control.value;
      if (selectedSubUniverse) {
        combinedSelections.push({
          key: selectedSubUniverse.key,
          name: selectedSubUniverse.name,
          ...(selectedSubUniverse.sub && {
            sub: selectedSubUniverse.sub,
          }),
        });
      }
    });
    return combinedSelections;
  }




  buildSnackStrings(allUniverses: UniverseOption[]): string[] {
    const snackStrings: string[] = [];

    allUniverses.forEach((universe: UniverseOption, index: number) => {
      let tempString = '';
      if (allUniverses.length > 1 && index === (allUniverses.length - 1)) {
        tempString += " and ";
      }
      tempString += universe.name.toString();
      if (universe.sub && universe.sub.length > 0) {
        if (universe.sub[0].name === 'All' || universe.sub.length > 1) {
          tempString += "";
        } else {
          tempString += ': ' + universe.sub[0].name.toString();
        }
      }
      snackStrings.push(tempString);
    });
    return snackStrings;
  }

  openSnackBar() {
    const combined = this.combineUniverseSelections(
      this.universesForm.controls.universes.value,
      this.subUniverses.controls as FormControl[]
    );
    const snackStrings = this.buildSnackStrings(combined);
    let snackString = '';
    if (combined.length === 1) {
      snackString += 'Your favorite Sci-Fi Universe is ' + snackStrings.toString() + "!";
    } else if (combined.length > 1) {
      snackString += 'Your favorite Sci-Fi Universes are ' + snackStrings.join(', ') + "!";
    } else {
      snackString += 'Please choose your favorite Sci-Fi Universe(s)';
    }
    this.snackBar.open(snackString, 'Dismiss');
  }

}
