package com.example.travelJournal.repository;

import com.example.travelJournal.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByCountryCountryId(Long countryId);
    List<Location> findByPlacePlaceId(Long placeId);

    @Query("SELECT l FROM Location l WHERE l.latitude BETWEEN :minLat AND :maxLat AND l.longitude BETWEEN :minLng AND :maxLng")
    List<Location> findByCoordinateRange(@Param("minLat") Double minLat, @Param("maxLat") Double maxLat,
                                         @Param("minLng") Double minLng, @Param("maxLng") Double maxLng);

    Optional<Location> findByLatitudeAndLongitude(String latitude, String longitude);
}
