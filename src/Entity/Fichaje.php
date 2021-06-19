<?php

namespace App\Entity;

use App\Repository\FichajeRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity(repositoryClass=FichajeRepository::class)
 * @ORM\Table(name="fichaje")
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
     * @ORM\ManyToOne(targetEntity=Evento::class, inversedBy="fichaje")
     * @JoinColumn(name="evento_id", referencedColumnName="id", nullable=false)
     */
    private $evento;

    /**
     * @ORM\Column(type="integer")
     */
    private $tipo;

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

    public function getTipo(): ?int
    {
        return $this->tipo;
    }

    public function setTipo(int $tipo): self
    {
        $this->tipo = $tipo;

        return $this;
    }
}
