package com.example.travelJournal.model;

import java.io.Serializable;
import java.util.Objects;

public class WasLocationId implements Serializable {
    private Long trip;
    private Long location;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WasLocationId)) return false;
        WasLocationId that = (WasLocationId) o;
        return Objects.equals(trip, that.trip) &&
                Objects.equals(location, that.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(trip, location);
    }
}
