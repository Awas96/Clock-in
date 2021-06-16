<?php

namespace App\Entity;

use App\Repository\FichajeRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FichajeRepository::class)
 */
class Fichaje
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $hora;

    /**
     * @ORM\OneToOne(targetEntity=Evento::class, mappedBy="fichaje", cascade={"persist", "remove"})
     */
    private $evento;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHora(): ?DateTimeInterface
    {
        return $this->hora;
    }

    public function setHora(DateTimeInterface $hora): self
    {
        $this->hora = $hora;

        return $this;
    }

    public function getEvento(): ?Evento
    {
        return $this->evento;
    }

    public function setEvento(?Evento $evento): self
    {
        $this->evento = $evento;

        return $this;
    }
}
