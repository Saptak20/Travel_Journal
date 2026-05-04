const express = require('express');

const Journal = require('../models/journal');
const { ratings } = require('../config/choices');

const router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};

const journalFormOptions = { ratings };

const buildJournalPayload = (body, ownerId) => ({
  destination: body.destination,
  arrivalDate: body.arrivalDate,
  departureDate: body.departureDate,
  experience: body.experience,
  rating: body.rating,
  owner: ownerId
});

const ensureDatesAreValid = (arrivalDate, departureDate) => {
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);

  return Number.isFinite(arrival.getTime()) && Number.isFinite(departure.getTime()) && departure >= arrival;
};

router.get('/journals', requireAuth, async (req, res, next) => {
  try {
    const journals = await Journal.find({ owner: req.user._id }).sort({ arrivalDate: -1 });

    res.render('journals/index', {
      pageTitle: 'My Journals',
      journals
    });
  } catch (error) {
    next(error);
  }
});

router.get('/journal/new', requireAuth, (req, res) => {
  res.render('journals/new', {
    pageTitle: 'New Journal',
    ...journalFormOptions,
    journal: {}
  });
});

router.post('/journal', requireAuth, async (req, res, next) => {
  try {
    if (!ensureDatesAreValid(req.body.arrivalDate, req.body.departureDate)) {
      return res.status(400).render('journals/new', {
        pageTitle: 'New Journal',
        ...journalFormOptions,
        journal: req.body,
        error: 'Arrival date must be on or before departure date.'
      });
    }

    if (!ratings.includes(Number(req.body.rating))) {
      return res.status(400).render('journals/new', {
        pageTitle: 'New Journal',
        ...journalFormOptions,
        journal: req.body,
        error: 'Rating must be between 1 and 5.'
      });
    }

    await Journal.create(buildJournalPayload(req.body, req.user._id));

    res.redirect('/journals');
  } catch (error) {
    next(error);
  }
});

router.get('/journals/:id', requireAuth, async (req, res, next) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, owner: req.user._id }).populate('owner', 'username travelStyle nationality favoriteContinent');

    if (!journal) {
      return res.status(404).render('error', {
        pageTitle: 'Journal Not Found',
        message: 'That journal could not be found.'
      });
    }

    res.render('journals/show', {
      pageTitle: journal.destination,
      journal
    });
  } catch (error) {
    next(error);
  }
});

router.get('/journals/:id/edit', requireAuth, async (req, res, next) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, owner: req.user._id });

    if (!journal) {
      return res.status(404).render('error', {
        pageTitle: 'Journal Not Found',
        message: 'That journal could not be found.'
      });
    }

    res.render('journals/edit', {
      pageTitle: 'Edit Journal',
      ...journalFormOptions,
      journal
    });
  } catch (error) {
    next(error);
  }
});

router.put('/journals/:id', requireAuth, async (req, res, next) => {
  try {
    if (!ensureDatesAreValid(req.body.arrivalDate, req.body.departureDate)) {
      return res.status(400).render('journals/edit', {
        pageTitle: 'Edit Journal',
        ...journalFormOptions,
        journal: { ...req.body, _id: req.params.id, destination: req.body.destination },
        error: 'Arrival date must be on or before departure date.'
      });
    }

    if (!ratings.includes(Number(req.body.rating))) {
      return res.status(400).render('journals/edit', {
        pageTitle: 'Edit Journal',
        ...journalFormOptions,
        journal: { ...req.body, _id: req.params.id, destination: req.body.destination },
        error: 'Rating must be between 1 and 5.'
      });
    }

    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      {
        arrivalDate: req.body.arrivalDate,
        departureDate: req.body.departureDate,
        experience: req.body.experience,
        rating: req.body.rating
      },
      { new: true, runValidators: true }
    );

    if (!journal) {
      return res.status(404).render('error', {
        pageTitle: 'Journal Not Found',
        message: 'That journal could not be found.'
      });
    }

    res.redirect(`/journals/${journal._id}`);
  } catch (error) {
    next(error);
  }
});

router.delete('/journals/:id', requireAuth, async (req, res, next) => {
  try {
    const journal = await Journal.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!journal) {
      return res.status(404).render('error', {
        pageTitle: 'Journal Not Found',
        message: 'That journal could not be found.'
      });
    }

    res.redirect('/journals');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
