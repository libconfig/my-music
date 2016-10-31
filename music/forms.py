from django import forms
from music.models import Track

class Track(forms.ModelForm):

    class Meta:
        model = Track
        fields = ['track_artist',]
        widgets = {
            'track_artist': forms.TextInput(
                attrs={'id': 'searchValue', 'class': 'form-control', 'required': True, 'placeholder': 'Search track'}
            ),
        }